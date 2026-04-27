import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "";

export async function GET() {
    const token = (await cookies()).get("token")?.value;
    if (!token) return NextResponse.json({ user: null });
    try {
        const decoded = verify(token, JWT_SECRET);
        return NextResponse.json({ user: decoded });
    } catch {
        return NextResponse.json({ user: null });
    }
}
