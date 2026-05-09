"use server";

import { db } from "@/db";
import { Household, Users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getUserFromToken, getUserWithRoomStatus } from "./user";
import { cookies } from "next/headers";
import { sign } from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "";

export async function createHome(name: string) {
    const invitationCode = crypto.randomUUID();

    try {
        //Already in a house check
        const userFromDbRes = await getUserWithRoomStatus();
        const { user } = await userFromDbRes?.json();
        if (user.householdId)
            return { status: 400, message: "Already in a room", householdId: null };

        //Creating and updating user house Id with the newlly created house

        const newHouseData = await db
            .insert(Household)
            .values({
                inviteCode: invitationCode,
                name,
            })
            .returning();

        await db
            .update(Users)
            .set({ householdId: newHouseData[0]._id })
            .where(eq(Users._id, user._id));
        return {
            status: 201,
            message: "House Created Successfully",
            householdId: newHouseData[0]._id,
        };
    } catch (error) {
        return { status: 400, message: "Already in a room", houseHoldId: null, error };
    }
}

export async function joinHome(inviteCode: string) {
    try {
        const userFromDbRes = await getUserWithRoomStatus();
        const { user } = await userFromDbRes?.json();
        if (user.householdId)
            return { status: 400, message: "Already in a room", householdId: null };

        const house = await db
            .select()
            .from(Household)
            .where(eq(Household.inviteCode, inviteCode));
        if (!house[0])
            return {
                status: 404,
                message: "House Doesnot Exist with this invitation code",
                householdId: null,
            };
        await db
            .update(Users)
            .set({ householdId: house[0]._id })
            .where(eq(Users._id, user._id));
        return {
            status: 200,
            message: "Joined house successfully",
            householdId: house[0]._id,
        };
    } catch (error) {
        return { status: 500, message: "Error", error, householdId: null };
    }
}

export async function leaveHome() {
    const token = (await cookies()).get("token")?.value;
    if (!token) return { status: 401, message: "Unauthorized" };
    try {
        const user = getUserFromToken(token);
        if (!user.householdId)
            return { status: 400, message: "Not in a room", householdId: null };

        const house = await db
            .select()
            .from(Household)
            .where(eq(Household._id, user.householdId));
        if (!house[0])
            return {
                status: 404,
                message: "House Doesnot Exist with this id",
                householdId: null,
            };
        await db.update(Users).set({ householdId: null }).where(eq(Users._id, user.id));

        const newToken = sign(
            {
                name: user.name,
                email: user.email,
                id: user.id,
                householdId: null,
            },
            SECRET,
        );

        (await cookies()).set("token", newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
        });

        return {
            status: 200,
            message: "Left successfully",
        };
    } catch (error) {
        return { status: 500, message: "Error", error };
    }
}
