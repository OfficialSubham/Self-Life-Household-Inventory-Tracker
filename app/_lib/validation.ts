import z from "zod";

export const userValidation = z.object({
    name: z.string().optional(),
    email: z.email(),
    password: z.string(),
});
