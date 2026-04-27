import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

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

    if (!token && !isAuthPage) return NextResponse.redirect(new URL("/login", req.url));
    if (token && isAuthPage) {
        return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
}
