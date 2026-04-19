import { userValidation } from "@/app/_lib/validation";
import { db } from "@/db";
import { Users } from "@/db/schema";
import { hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const SALT = Number(process.env.SALT);
const SECRET = process.env.JWT_SECRET || "";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, password } = body;

        const { success } = userValidation.safeParse({
            name,
            email,
            password,
        });

        if (!success)
            return NextResponse.json(
                {
                    message: "Please enter valid credentials",
                },
                { status: 400 },
            );

        const hashPassword = await hash(password, SALT);

        const data = await db
            .insert(Users)
            .values({
                name,
                email,
                password: hashPassword,
            })
            .returning({ name: Users.name, email: Users.email, id: Users._id });

        const user = data[0];

        const token = sign(user, SECRET);

        (await cookies()).set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
        });

        return NextResponse.json(
            {
                message: "User created successfully",
                token,
            },
            { status: 201 },
        );
    } catch {
        return NextResponse.json({ message: "User already existed" }, { status: 400 });
    }
}
