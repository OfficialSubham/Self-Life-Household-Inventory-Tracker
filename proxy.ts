import { verify } from "jsonwebtoken";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { JwtPayload } from "./lib/types";

const JWT_SECRET = process.env.JWT_SECRET || "";

export function proxy(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const { pathname } = req.nextUrl;

    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.includes(".")
    )
        return NextResponse.next();

    const isAuthPage = pathname == "/login" || pathname == "/register";

    if (!token) {
        if (!isAuthPage) return NextResponse.redirect(new URL("/login", req.url));
        return NextResponse.next();
    }

    try {
        const decoded = verify(token, JWT_SECRET) as JwtPayload;
        if (decoded.householdId && pathname == "/")
            return NextResponse.redirect(new URL("/home", req.url));
        //I am checking where the client is in / route or in another route if there is no room id in his/her token
        // if (decoded.roomId == -1) {
        //     if (pathname !== "/") return NextResponse.redirect(new URL("/", req.url));
        // }
        // if (decoded.roomId !== -1 && pathname == "/") {
        //     return NextResponse.redirect(new URL("/home", req.url));
        // }

        return NextResponse.next();
    } catch {
        if (!isAuthPage) return NextResponse.redirect(new URL("/login", req.url));
        return NextResponse.next();
    }
}

//Now i am checking weather there is token if it has a token
//Check for validation if not valid then redirect to login or signup
//If valid then what you can visit any routes
