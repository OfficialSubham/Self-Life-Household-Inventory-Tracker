import z from "zod";

export const userValidation = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string(),
});
