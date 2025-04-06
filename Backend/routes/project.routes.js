import express from "express"
import { createProject, deleteProject, getAllProject, getProjectByid, projectsByUser, updateProject } from "../controllers/project.controller.js";
import { verifyAdmin, verifyAuth } from "../middlewares/auth.middleware.js";

const router=express.Router();

router.post('/createproject', verifyAdmin, createProject)
router.get('/projects', verifyAdmin, getAllProject)
router.get('/projectsByUser', verifyAuth, projectsByUser);
router.get('/projectbyid/:id', verifyAuth, getProjectByid)
router.put('/updateproject/:id', verifyAdmin, updateProject)
router.delete('/delete/:id', verifyAdmin, deleteProject)



export default router;