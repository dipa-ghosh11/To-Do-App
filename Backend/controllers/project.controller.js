import { Project } from "../models/projects.model.js";
import mongoose from "mongoose";

export const createProject= async(req, res)=>{
    try {
        const { projectTitle, projectDescription, projectStatus, startDate, endDate, isDelete, assignedUsers}=req.body;

        // if (!projectTitle || !projectDescription || !projectStatus || !startDate || !endDate || !assignedUsers || !createdBy){
        //     return res.status(400).json({success: false, message: "All fiels are required"});
        // }

        const userid=req.user._id.toString();
        console.log(req.user)

        if (!Array.isArray(assignedUsers)) {
            return res.status(400).json({ success: false, message: "assignedUsers must be an array" });
        }

        if (!assignedUsers.every(user => mongoose.Types.ObjectId.isValid(user))) {
            return res.status(400).json({ success: false, message: "Invalid user IDs in assignedUsers array" });
        }

        const project = await Project.create({ 
            projectTitle,
            projectDescription,
            projectStatus: projectStatus || "Pending", 
            startDate, 
            endDate, 
            isDelete: isDelete ?? false, 
            assignedUsers, 
            createdBy: userid })

        return res.status(200).json({success: true, message: "Project created successfully", project});



    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Error creating project", error: error.message })
    }
}