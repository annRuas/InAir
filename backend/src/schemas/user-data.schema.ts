import { z } from "zod";

export const userDataSchema = z.object({
    name: z.string().max(30),
    email: z.string().email().max(30)
});

export type UserData = z.infer<typeof userDataSchema>;