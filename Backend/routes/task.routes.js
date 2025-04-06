import express from "express";
import { createTask, deleteTask, getAllTask, getTaskById, getTaskByUser, updateTask } from "../controllers/task.controller.js";
import { verifyAdmin, verifyAuth, verifyUser } from "../middlewares/auth.middleware.js";

const router=express.Router();


router.post('/createtask', verifyAdmin, createTask)
router.get('/tasks', verifyAdmin, getAllTask)
router.get('/taskbyid/:id', verifyAdmin, getTaskById)
router.put('/updatetask/:id', verifyAuth, updateTask)
router.delete('/deletetask/:id', verifyAdmin, deleteTask)
router.get('/getTasksByUser/:id', verifyUser, getTaskByUser);


export default router;