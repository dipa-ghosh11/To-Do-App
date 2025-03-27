import express from "express"
import { createProject, getAllProject, getProjectByid } from "../controllers/project.controller.js";
import { verifyAdmin } from "../middlewares/auth.middleware.js";

const router=express.Router();

router.post('/createproject', verifyAdmin, createProject)
router.get('/projects', verifyAdmin, getAllProject)
router.get('/projectbyid/:id', getProjectByid)
export default router;