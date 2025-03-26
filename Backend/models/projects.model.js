import mongoose from "mongoose";

const projectSchema=new mongoose.Schema({
    name: {type:String, required:true},
    description: {type:String, required:true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    tasks: [{type:mongoose.Schema.Types.ObjectId, ref: "Task"}],
    createdAt: {type:Date},
    updatedAt: {type:Date}
},{timestamps:true})

export const Project=mongoose.model("Project", projectSchema);