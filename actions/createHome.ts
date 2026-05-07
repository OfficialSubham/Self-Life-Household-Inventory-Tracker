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
        console.log("USER : ", user);
        if (user.householdId)
            return { status: 400, message: "Already in a room", houseHoldId: null };

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

        return { status: 201, message: "hghgfghjfhgj", householdId: newHouseData[0]._id };
    } catch (error) {
        return { status: 400, message: "Already in a room", houseHoldId: null, error };
    }
}
