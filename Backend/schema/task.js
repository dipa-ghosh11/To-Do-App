import {z} from "zod";

export const taskZodSchema = z.object({
    taskTitle: z.string().min(1, { message: "Task title is required" }).max(255, { message: "Task title cannot exceed 255 characters" }),

    taskDescription: z.string().min(1, { message: "Task description is required" }),

    taskStatus: z.enum(["To Do", "In Progress", "Done"], { message: "Invalid task status" }),

    startDate: z.date({ required_error: "Start date is required" }),

    endDate: z.date({ required_error: "End date is required" }),

    isDelete: z.boolean().default(false),

    projectId: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), { message: "Invalid project ID" }),

    assignedUsers: z.array(z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), { message: "Invalid user ID" })).nonempty({ message: "At least one assigned user is required" }),
    
    createdBy: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), { message: "Invalid creator ID" }),
});