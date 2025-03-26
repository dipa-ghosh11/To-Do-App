import mongoose from "mongoose";
import { projectZodSchema } from "../schema/project";

const projectSchema=new mongoose.Schema({
    projectTitle: {type:String, required:true},
    projectDescription: {type:String, required:true},
    projectStatus: {type: String, default: "Pending", required: true},
    startDate: {type: Date, required: true},
    endDate:{type: Date, required: true},
    isDelete:{type: boolean, required: true},
    assignedUsers:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});


projectSchema.pre("validate", function(next){
    try{
        projectZodSchema.parse(this.toObject())
        next();
    }
    catch(error){
        next(new Error(error.errors.map(e=>e.message).join(",")))
    }
})
export const Project=mongoose.model("Project", projectSchema);