import { JwtPayload } from "./types";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "";

export async function getUser() {
    const token = (await cookies()).get("token")?.value;
    if (!token) return null;

    try {
        const decoded = verify(token, JWT_SECRET) as JwtPayload;
        return decoded;
    } catch {
        return null;
    }
}

export async function getUserDetails() {
    const res = await fetch("api/me", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await res.json();
    return data;
}
