import { NextRequest } from "next/server";
import { JwtPayload } from "./types";
import { verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";

export async function getUser(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    if (!token) return null;

    try {
        const decoded = verify(token, JWT_SECRET) as JwtPayload;
        return decoded;
    } catch {
        return null;
    }
}
