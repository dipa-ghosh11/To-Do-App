import mongoose from "mongoose";
import { projectZodSchema } from "../schema/project.js";

const projectSchema=new mongoose.Schema({
    projectTitle: {type:String, required:true},
    projectDescription: {type:String, required:true},
    projectStatus: {type: String, default: "Pending", required: true},
    startDate: {type: Date, required: true},
    endDate:{type: Date, required: true},
    isDelete:{type: Boolean, required: true},
    assignedUsers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});


projectSchema.pre("validate", function(next){
    try{
        // projectZodSchema.parse(this.toObject())
        const validatedData = projectZodSchema.parse({
            ...this.toObject(), createdBy: this.createdBy.toString(), assignedUsers: this.assignedUsers.map(u => {
                u._id.toString();
            })
        });

        Object.assign(this, validatedData);
        next();
    }
    catch(error){
        next(new Error(error.errors.map(e=>e.message).join(",")))
    }
})
export const Project=mongoose.model("Project", projectSchema);