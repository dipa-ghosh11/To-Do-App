import { Project } from "../models/projects.model.js";
import mongoose from "mongoose";

export const createProject= async(req, res)=>{
    try {
        const { projectTitle, projectDescription, projectStatus, startDate, endDate, isDelete, assignedUsers}=req.body;

        // if (!projectTitle || !projectDescription || !projectStatus || !startDate || !endDate || !assignedUsers || !createdBy){
        //     return res.status(400).json({success: false, message: "All fiels are required"});
        // }

        const userid=req.user._id.toString();
        // console.log(typeof userid)

        if (!Array.isArray(assignedUsers)) {
            return res.status(400).json({ success: false, message: "assignedUsers must be an array" });
        }

        if (!assignedUsers.every(user => mongoose.Types.ObjectId.isValid(user))) {
            return res.status(400).json({ success: false, message: "Invalid user IDs in assignedUsers array" });
        }

        const newAss = assignedUsers.map(user => user.toString());

        const project = await Project.create({ 
            projectTitle,
            projectDescription,
            projectStatus: projectStatus || "Pending", 
            startDate, 
            endDate, 
            isDelete: isDelete ?? false, 
            assignedUsers : newAss, 
            createdBy: userid })

        return res.status(200).json({success: true, message: "Project created successfully", project});



    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Error creating project", error: error.message })
    }
}



export const getAllProject= async(req, res)=>{
    try {
        const projects = await Project.find();

        if (!projects || projects.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No projects found"
            });
        }

        return res.status(200).json({
            succes: true,
            message: "Project fetched successfully",
            projects
        })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", error: error.message })
    }
}


export const getProjectByid= async(req, res)=>{
    try {
        const project= await Project.findById(req.params.id);

        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ success: false, message: "Invalid project ID" });
        }
        
        if(!project){
            return res.status(404).json({ success: false, message: "Project not found" })
        }
        
        res.status(200).json({ success: true, message: "Project fetched successfully", project });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error", error: error.message })
    }
}