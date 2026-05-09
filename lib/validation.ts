import z from "zod";

const categories = ["other", "produce", "dairy", "meat", "pantry", "frozen"] as const;

export const userValidation = z.object({
    name: z.string().optional(),
    email: z.email(),
    password: z.string(),
});

export const stringValidation = z.string().min(5);

export const uuidSchema = z.string().uuid();

export const productSchema = z.object({
    productName: z.string().nonempty(),
    category: z.enum(categories),
    quantity: z.number().min(1),
    expiryDate: z.iso.date().refine(
        (date) => {
            const inputDate = new Date(date);
            const now = new Date();
            now.setHours(0, 0, 0, 0);
            return inputDate.getTime() >= now.getTime();
        },
        {
            message: "The Expiry Date must be in future",
        },
    ),
});
