import { getUserWithRoomStatus } from "@/actions/user";

export async function GET() {
    //Get user from server actions
    const res = await getUserWithRoomStatus();
    if (!res) return Response.json({ user: null, roomId: null });
    const data = await res.json();
    return Response.json(data);
}
