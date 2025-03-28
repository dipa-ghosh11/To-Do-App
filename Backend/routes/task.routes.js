import express from "express";
import { createTask, getAllTask } from "../controllers/task.controller.js";
import { verifyAdmin } from "../middlewares/auth.middleware.js";

const router=express.Router();


router.post('/createtask', verifyAdmin, createTask);
router.get('/tasks', getAllTask);


export default router;