import { Task } from "../models/task.model.js";
import mongoose from "mongoose";

export const createTask = async (req, res) => {
    try {
        const { taskTitle, taskDescription, taskStatus, startDate, endDate, isDelete, projectId, assignedUsers } = req.body;

        const userid = req.user._id.toString();

        if (!assignedUsers.every(user => mongoose.Types.ObjectId.isValid(user))) {
            return res.status(400).json({ success: false, message: "Invalid user IDs in assignedUsers array" });
        }

        const newAss = assignedUsers.map(user => user.toString());
        const task = await Task.create({
            taskTitle,
            taskDescription,
            taskStatus,
            startDate,
            endDate,
            isDelete,
            projectId,
            assignedUsers: newAss,
            createdBy: userid
        });

        return res.status(200).json({ success: true, message: "Task created successfully", task });


    } catch (error) {
        return res.status(500).json({ success: false, message: "Error creating project", error: error.message })
    }
}


export const getAllTask= async(req, res)=>{
    try {
        const tasks= await Task.find();

        if (!tasks || tasks.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No tasks found"
            });
        }

        return res.status(200).json({
            succes: true,
            message: "Tasks fetched successfully",
            tasks
        })

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", error: error.message })
    }
}