import { createHome } from "@/actions/homeActions";
import { getUser } from "@/lib/auth";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const SECRET = process.env.JWT_SECRET || "";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const user = await getUser();
    if (!user) throw new Error("Unauthorized");
    try {
        const { message, status, householdId } = await createHome(body.houseName);
        // Updating the cookie if the user is creating a home
        if (status == 201) {
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
