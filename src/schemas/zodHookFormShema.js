import { z } from "zod";

export const zodShema = (arr) => z.object({
    username: z
        .string()
        .min(1, { message: "Заповніть це поле" }),
    email: z
        .string("Email is required")
        .email("Email format is not valid"),
    channel: z.string().superRefine((val, ctx) => {
        const isExist = arr.includes(val);
        // console.log('arr:', arr)
        // console.log('val:', val)
        if (!isExist) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "should be cat or dog",
                fatal: true,
            });

            return z.NEVER;
        }


    })
})