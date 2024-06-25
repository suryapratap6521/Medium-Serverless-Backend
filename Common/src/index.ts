import z from "zod";

export const signupInput=z.object({
    email:z.string().email(),
    password:z.string().min(6),
    name:z.string().optional()
})


//type inference in zod ---> this is mainly for frontend devs to see the what is name of the inputs 

export type signupInput=z.infer<typeof signupInput>


export const signinInput=z.object({
    email:z.string().email(),
    password:z.string().min(6),
    
})




export type signinInput=z.infer<typeof signinInput>

export const createblogInput=z.object({
    content:z.string().optional(),
    title:z.string(),
    published:z.boolean(),
})

export type createblogInput=z.infer<typeof createblogInput>

export const upadateblogInput=z.object({
    content:z.string(),
    title:z.string(),
    id:z.string()
})
export type upadateblogInput=z.infer<typeof upadateblogInput>