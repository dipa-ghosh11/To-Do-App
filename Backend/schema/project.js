import {z} from "zod";

export const projectZodSchema = z.object({
    projectTitle: z.string({ required_error: "Project title is required" })
        .min(1, "Project title cannot be empty")
        .max(100, "Project title cannot exceed 100 characters"),

    projectDescription: z.string({ required_error: "Project description is required" })
        .min(10, "Project description must be at least 10 characters"),

    projectStatus: z.enum(["Pending", "In Progress", "Completed"], { required_error: "Project status is required" }),

    startDate: z.coerce.date({ required_error: "Start date is required" }),

    endDate: z.coerce.date({ required_error: "End date is required" })
        .refine((endDate, ctx) => {
            const { startDate } = ctx.parent;
            return endDate >= startDate;
        }, { message: "End date cannot be before the start date" }),

    isDelete: z.boolean().default(false),

    assignedUsers: z.array(z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), { message: 'Invalid ObjectId' })),

    createdBy: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), { message: 'Invalid ObjectId' }),
});