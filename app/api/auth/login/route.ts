import { userValidation } from "@/app/_lib/validation";
import { db } from "@/db";
import { Users } from "@/db/schema";
import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const SECRET = process.env.JWT_SECRET || "";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { email, password } = body;
    console.log(email);
    const { success } = userValidation.safeParse({
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

    const user = await db.select().from(Users).where(eq(Users.email, email));

    if (!user[0])
        return NextResponse.json(
            {
                message: "User with this email doesnot exists",
            },
            { status: 404 },
        );

    const isPasswordValid = await compare(password, user[0].password);

    if (!isPasswordValid)
        return NextResponse.json(
            {
                message: "Please enter valid credentials",
            },
            { status: 404 },
        );
    const token = sign(
        { name: user[0].name, email: user[0].email, id: user[0]._id },
        SECRET,
    );

    (await cookies()).set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
    });
    //secure is always true but we are also developing locally so we
    //need it to be work in localhost so that condition is applied
    return NextResponse.json({
        message: "User created successfully",
        token,
    });
}
