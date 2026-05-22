import { db } from "@/db";
import { Items } from "@/db/schema";
import { ProductDetails } from "@/lib/types";
import { eq, lte } from "drizzle-orm";
import { NextResponse } from "next/server";

export const getStatus = (expiryTime: Date) => {
    const currTime = new Date();
    currTime.setHours(0, 0, 0, 0);

    const threeDaysInMs = 3 * 24 * 60 * 60 * 1000;
    let status: "fresh" | "expiring-soon" | "expired" | "used" | "wasted";
    if (expiryTime.getTime() <= currTime.getTime()) status = "expired";
    else if (expiryTime.getTime() <= currTime.getTime() + threeDaysInMs)
        status = "expiring-soon";
    else status = "fresh";

    return status;
};

export const updateStatus = async (product: ProductDetails) => {
    try {
        await db
            .update(Items)
            .set({
                updatedAt: product.updatedAt,
                status: product.status,
            })
            .where(eq(Items._id, product._id));
        return true;
    } catch (error) {
        console.log("Error while updating ->", error);
        throw new Error("Something went wrong");
    }
};

export const POST = async () => {
    try {
        const updateTime = new Date();
        const now = new Date();
        now.setDate(now.getDate() + 7);
        const products = await db.select().from(Items).where(lte(Items.expiryDate, now));

        for (const product of products) {
            const status = getStatus(product.expiryDate!);
            if (product.status != status) {
                product.status = status;
                product.updatedAt = updateTime;
                await updateStatus(product);
            }
        }

        return NextResponse.json({ message: "Successfully updated" });
    } catch (error) {
        console.log("UPDATE ERROR ->", error);
        return NextResponse.json({ message: "Working" });
    }
};
