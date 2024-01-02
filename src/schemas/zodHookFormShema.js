import { z } from "zod";

export const zodShema = z.object({
    username: z.string().nonempty("Username is required"),
    email: z.string().nonempty("Email is required").email("Email format is not valid"),
    comment: z.string().nonempty("Username is required")
})