import {z} from "zod"

export const userZodSchema=z.object({
    name: z.string({required_error: "Name is required"}).refine((value)=>/^[a-zA-Z]+[-'s]?[a-zA-Z]+$/.test(value ?? " "),"Name should contain only alphabets"),
    email: z.string({required_error: "Email is required"}).email("Please provide a valid email"),
    password: z.string({ required_error: "Pasword is required" }).min(6, "Password must be at least 8 characters").max(16, "Password must be at most 16 characters"),
    role: z.string({required_error: "Role is required"}).enum(["user", "admin"]),
    projects: z.string().optional()

});
