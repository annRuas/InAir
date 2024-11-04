import { z } from "zod";

export const userHeaderSchema = z.object({
    uid: z.string() 
});

export type UserHeader = z.infer<typeof userHeaderSchema>;