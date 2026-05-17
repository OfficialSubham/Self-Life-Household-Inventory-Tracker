import { db } from "@/db";
import { Household, Items, RoomJoinStatus, Users } from "@/db/schema";
import { JwtPayload } from "@/lib/types";
import { eq } from "drizzle-orm";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "";

export async function getUserFromDb(userId: number) {
    const user = await db.select().from(Users).where(eq(Users._id, userId));
    return user[0];
}

export async function getUserWithRoomStatus() {
    const token = (await cookies()).get("token")?.value;
    if (!token) return null;
    try {
        const decoded = verify(token, JWT_SECRET) as JwtPayload;
        // Getting user room join status
        const result = await db
            .select({
                _id: Users._id,
                joinedStatus: RoomJoinStatus.joinedStatus,
                householdId: Users.householdId,
                name: Users.name,
                email: Users.email,
            })
            .from(Users)
            .leftJoin(RoomJoinStatus, eq(Users._id, RoomJoinStatus.userId))
            .where(eq(Users._id, decoded.id));
        return Response.json({
            user: result[0],
        });
    } catch (err) {
        console.log(err);
        return Response.json({ user: null, roomId: null });
    }
}

export async function getUserWithAllProduct() {
    const token = (await cookies()).get("token")?.value;
    if (!token) return null;
    try {
        const decoded = verify(token, JWT_SECRET) as JwtPayload;
        // Getting user room join status
        const user = await db
            .select({
                _id: Users._id,
                householdId: Users.householdId,
                name: Users.name,
                email: Users.email,
            })
            .from(Users)
            .where(eq(Users._id, decoded.id));

        if (!user[0]) return null;

        const items = await db
            .select({
                _id: Items._id,
                householdId: Items.householdId,
                addedBy: Items.addedBy,
                name: Items.name,
                category: Items.category,
                expiryDate: Items.expiryDate,
                status: Items.status,
                createdAt: Items.createdAt,
                updatedAt: Items.updatedAt,
                quantity: Items.quantity,
            })
            .from(Items)
            .where(eq(Items.householdId, user[0].householdId!));
        return {
            user: user[0],
            items,
        };
    } catch (error) {
        console.log(error);
        return null;
    }
}

export function getUserFromToken(token: string) {
    const decoded = verify(token, JWT_SECRET) as JwtPayload;
    return decoded;
}

export async function getAllMembers() {
    const token = (await cookies()).get("token")?.value;
    if (!token) return null;

    const user = getUserFromToken(token);

    const users = await db
        .select({
            _id: Users._id,
            householdId: Users.householdId,
            name: Users.name,
            email: Users.email,
        })
        .from(Users)
        .where(eq(Users.householdId, user.householdId));
    const houseDetails = await db
        .select()
        .from(Household)
        .where(eq(Household._id, user.householdId));
    return { users, houseDetails: houseDetails[0] };
}
