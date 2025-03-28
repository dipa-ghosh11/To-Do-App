import mongoose from "mongoose";
import { taskZodSchema } from "../schema/task.js";


const taskSechema= new mongoose.Schema({
    taskTitle:{
        type: String,
        required: true
    },

    taskDescription:{
        type: String,
        required: true
    },

    taskStatus:{
        type: String,
        required: true
    },

    startDate:{
        type: Date,
        required: true
    },

    endDate:{
        type: Date,
        required: true
    },

    isDelete:{
        type: Boolean
    },

    projectId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    },

    assignedUsers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
    
})


taskSechema.pre("validate", function(next){
    try{
        
        const validatedData = taskZodSchema.parse({
            ...this.toObject(),
            projectId: this.projectId.toString(),
            createdBy: this.createdBy.toString(),
            assignedUsers: this.assignedUsers.map(u => u?._id.toString()) 
        });
        Object.assign(this, validatedData);
        next();
    }
    catch(error){
        console.log(error)
        next(new Error(error.errors.map(e=>e.message).join(",")))
    }
})
export const Task=mongoose.model("Task", taskSechema);