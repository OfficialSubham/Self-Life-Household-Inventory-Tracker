import { joinHome } from "@/actions/homeActions";
import { getUser } from "@/lib/auth";
import { uuidSchema } from "@/lib/validation";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const SECRET = process.env.JWT_SECRET || "";

export async function POST(req: NextRequest) {
    const user = await getUser();
    if (!user) return NextResponse.json({ message: "Unauthorized" });
    const body = await req.json();
    const { inviteCode } = body;
    const { success, data } = uuidSchema.safeParse(inviteCode);
    if (!success)
        return NextResponse.json(
            { message: "Please Enter a valid invite code" },
            { status: 400 },
        );
    try {
        const { message, status, householdId } = await joinHome(data);
        // Updating the cookie if the user is creating a home
        if (status == 200) {
            const token = sign(
                {
                    name: user.name,
                    email: user.email,
                    id: user.id,
                    householdId,
                },
                SECRET,
            );

            (await cookies()).set("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
            });
        }
        return NextResponse.json({ message }, { status });
    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error", error },
            { status: 500 },
        );
    }
}
