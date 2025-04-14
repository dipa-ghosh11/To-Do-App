import { Project } from "../models/projects.model.js";
import mongoose from "mongoose";

export const createProject= async(req, res)=>{
    try {
        const { projectTitle, projectDescription, projectStatus, startDate, endDate, isDelete, assignedUsers}=req.body;

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
        // console.log(error)
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
        
        res.status(500).json({ success: false, message: "Internal server error", error: error.message })
    }
}


export const updateProject= async(req, res)=>{
    try {
        const projectId=req.params.id;
        const updateProject = await Project.findByIdAndUpdate(projectId, req.body, { new: true, runValidators: true, context: 'query'});

        if(!updateProject){
            return res.status(404).json({success: false, message: "Project not found"});
        }

        res.status(200).json({success: true, message: "Project updated successfully"})
    } catch (error) {
        res.status(500).json({success: false, message: "Internal server error"})
    }
}


export const deleteProject= async(req, res)=>{
    try {
            const projectId = req.params.id;
            const deletedProject = await Project.findByIdAndDelete(projectId);
            if (!deletedProject) {
                return res.status(404).json({ success: false, message: "Project not found" });
            }
            return res.status(200).json({ success: true, message: "Project deleted successfully" });
        }
    
        catch (error) {
            return res.status(500).json({ success: false, message: "Internal server error" , error:error.message});
        }
}

export const projectsByUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const projects = await Project.find({ assignedUsers: userId });
        if (!projects) return res.status(404).json({ success: false, message: "Projects not found" });
        return res.status(200).json({ success: true, message: "Projects fetched", projects });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
}