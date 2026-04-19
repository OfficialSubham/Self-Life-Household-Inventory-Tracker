import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const pathName = req.nextUrl.pathname;
    const isAuthPage = pathName == "/login" || pathName == "/register";

    if (!token && !isAuthPage) return NextResponse.redirect(new URL("/login", req.url));
    if (token && isAuthPage) {
        return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
}
