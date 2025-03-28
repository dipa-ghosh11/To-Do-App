import mongoose from "mongoose";


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

    assignedUsers:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
    
})

export const Task=mongoose.model("Task", taskSechema);