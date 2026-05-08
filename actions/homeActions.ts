import { db } from "@/db";
import { Household, Users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getUserWithRoomStatus } from "./user";

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
