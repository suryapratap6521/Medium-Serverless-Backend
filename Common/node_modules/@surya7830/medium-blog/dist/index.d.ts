import z from "zod";
export declare const signupInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name?: string | undefined;
}, {
    email: string;
    password: string;
    name?: string | undefined;
}>;
export type signupInput = z.infer<typeof signupInput>;
export declare const signinInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type signinInput = z.infer<typeof signinInput>;
export declare const createblogInput: z.ZodObject<{
    content: z.ZodOptional<z.ZodString>;
    title: z.ZodString;
    published: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    title: string;
    published: boolean;
    content?: string | undefined;
}, {
    title: string;
    published: boolean;
    content?: string | undefined;
}>;
export type createblogInput = z.infer<typeof createblogInput>;
export declare const upadateblogInput: z.ZodObject<{
    content: z.ZodString;
    title: z.ZodString;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    content: string;
    title: string;
    id: string;
}, {
    content: string;
    title: string;
    id: string;
}>;
export type upadateblogInput = z.infer<typeof upadateblogInput>;
