import express from "express"
import { createProject } from "../controllers/project.controller.js";
import { verifyAdmin } from "../middlewares/auth.middleware.js";

const router=express.Router();

router.post('/createproject', verifyAdmin, createProject)


export default router;