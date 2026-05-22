import { db } from "@/db";
import { Items } from "@/db/schema";
import { ProductDetails } from "@/lib/types";
import { getStatus } from "@/lib/utils";
import { eq, lte } from "drizzle-orm";
import { NextResponse } from "next/server";

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

export const updateStatus = async (product: ProductDetails) => {
    try {
        await db.update(Items).set(product).where(eq(Items._id, product._id));
        return true;
    } catch (error) {
        console.log("Error while updating ->", error);
        throw new Error("Something went wrong");
    }
};
