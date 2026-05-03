import { db } from "@/db";
import { RoomJoinStatus, Users } from "@/db/schema";
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
            .select()
            .from(Users)
            .leftJoin(RoomJoinStatus, eq(Users._id, RoomJoinStatus.userId))
            .where(eq(Users._id, decoded.id));
        return Response.json({
            user: decoded,
            roomId:
                result[0].room_join_status &&
                result[0].room_join_status.joinedStatus == "succeed"
                    ? result[0].room_join_status.houseHoldId
                    : null,
        });
    } catch (err) {
        console.log(err);
        return Response.json({ user: null, roomId: null });
    }
}
