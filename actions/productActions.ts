"use server";
import { Product } from "@/lib/types";
import { db } from "@/db";
import { Items } from "@/db/schema";
import { cookies } from "next/headers";
import { getUserFromToken } from "./user";

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

        await db.insert(Items).values({
            addedBy: user.id,
            householdId: user.householdId,
            name: productName,
            expiryDate: timeOfExpired,
            category,
            status,
            quantity,
        });
        return { message: "Successfully Created" };
    } catch (error) {
        console.log("Create Product Error : ", error);
        return null;
    }
};
