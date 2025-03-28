import express from "express"
import { createProject, deleteProject, getAllProject, getProjectByid, updateProject } from "../controllers/project.controller.js";
import { verifyAdmin } from "../middlewares/auth.middleware.js";

const router=express.Router();

router.post('/createproject', verifyAdmin, createProject)
router.get('/projects', verifyAdmin, getAllProject)
router.get('/projectbyid/:id', getProjectByid)
router.put('/updateproject/:id', updateProject)
router.delete('/delete/:id', verifyAdmin, deleteProject)



export default router;