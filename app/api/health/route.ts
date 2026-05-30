import { NextResponse } from "next/server";

let count = 0;

export function GET() {
    console.log("Working ", count++);
    return NextResponse.json({ status: "ok" });
}
