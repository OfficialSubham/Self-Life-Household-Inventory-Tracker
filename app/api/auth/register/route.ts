import { userValidation } from "@/app/_lib/validation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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

    //Db work

    return NextResponse.json(
        {
            message: "User created successfully",
        },
        { status: 201 },
    );
}
