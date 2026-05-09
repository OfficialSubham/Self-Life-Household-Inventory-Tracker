import z from "zod";
import { productSchema } from "./validation";

export type JwtPayload = {
    name: string;
    email: string;
    id: number;
    householdId: number;
};

export type Product = z.infer<typeof productSchema>;
