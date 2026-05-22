"use server";
import { Product, ProductDetails } from "@/lib/types";
import { db } from "@/db";
import { Items } from "@/db/schema";
import { cookies } from "next/headers";
import { getUserFromToken } from "./user";
import { eq } from "drizzle-orm";

export const createProduct = async ({
    category,
    expiryDate,
    productName,
    quantity,
}: Product) => {
    const token = (await cookies()).get("token")?.value;
    if (!token) return null;
    try {
        const user = getUserFromToken(token);
        const timeOfExpired = new Date(expiryDate);
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        const threeDaysInMs = 3 * 24 * 60 * 60 * 1000;
        let status: "fresh" | "expiring-soon" | "expired" | "used" | "wasted";
        if (timeOfExpired.getTime() <= now.getTime()) status = "expired";
        else if (timeOfExpired.getTime() <= now.getTime() + threeDaysInMs)
            status = "expiring-soon";
        else status = "fresh";

        const product = await db
            .insert(Items)
            .values({
                addedBy: user.id,
                householdId: user.householdId,
                name: productName,
                expiryDate: timeOfExpired,
                category,
                status,
                quantity,
            })
            .returning();
        return { message: "Successfully Created", product: product[0] };
    } catch {
        return null;
    }
};

export const getAllProduct = async () => {
    const token = (await cookies()).get("token")?.value;
    if (!token) return null;
    try {
        const user = getUserFromToken(token);

        const products = await db
            .select()
            .from(Items)
            .where(eq(Items.householdId, user.householdId));

        console.log(products);
        return products;
    } catch {
        return null;
    }
};

export const editProduct = async ({
    _id,
    category,
    expiryDate,
    name,
    quantity,
}: ProductDetails) => {
    const token = (await cookies()).get("token")?.value;
    if (!token) return null;

    try {
        const timeOfExpired = new Date(expiryDate!);
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        const threeDaysInMs = 3 * 24 * 60 * 60 * 1000;
        let status: "fresh" | "expiring-soon" | "expired" | "used" | "wasted";
        if (timeOfExpired.getTime() <= now.getTime()) status = "expired";
        else if (timeOfExpired.getTime() <= now.getTime() + threeDaysInMs)
            status = "expiring-soon";
        else status = "fresh";

        const product = await db
            .update(Items)
            .set({
                category,
                status,
                quantity,
                name,
            })
            .where(eq(Items._id, _id))
            .returning();
        return { message: "Successfully Created", product: product[0] };
    } catch (error) {
        console.log("Product Update Error ->", error);
        return null;
    }
};

export const deleteProduct = async (productId: number) => {
    const token = (await cookies()).get("token")?.value;
    if (!token) return null;

    try {
        await db.delete(Items).where(eq(Items._id, productId));

        return { message: "Product Deleted Successfully" };
    } catch (error) {
        console.log("Delete Product Error ->", error);
        return null;
    }
};
