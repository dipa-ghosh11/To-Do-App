import {z} from "zod"

export const userZodSchema=z.object({
    fullName: z.string({ required_error: "Name is required" }).refine((value) => /^[a-zA-Z]+(?:[-'s]?[a-zA-Z]+)*(?:\s[a-zA-Z]+(?:[-'s]?[a-zA-Z]+)*)*$/
.test(value ?? " "),"Name should contain only alphabets"),
    email: z.string({required_error: "Email is required"}).email("Please provide a valid email"),
    password: z.string({ required_error: "Pasword is required" }).min(6, "Password must be at least 6 characters"),
    role: z.enum(["user", "admin"], { required_error: "Role is required" }),
   

});
