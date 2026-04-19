import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "";

export async function requireAuth() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) throw new Error("Unauthorized: No token");

    try {
        const decoded = verify(token, SECRET);
        return decoded;
    } catch {
        throw new Error("Unauthorized: Invalid token");
    }
}
