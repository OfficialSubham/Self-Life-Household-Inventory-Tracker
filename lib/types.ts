import z from "zod";
import { productSchema } from "./validation";

export type JwtPayload = {
    name: string;
    email: string;
    id: number;
    householdId: number;
};

export type ProductDetails = {
    _id: number;
    householdId: number;
    addedBy: number;
    name: string;
    category: "other" | "produce" | "dairy" | "meat" | "pantry" | "frozen" | null;
    expiryDate: Date | null;
    status: "fresh" | "expiring-soon" | "expired" | "used" | "wasted" | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    quantity: number;
};

export type Product = z.infer<typeof productSchema>;
