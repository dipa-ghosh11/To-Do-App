import express from "express"
import { createUser, getAllUsers, getUser, loginUser, logoutUser } from "../controllers/user.controller.js";

const router=express.Router();

router.post('/register', createUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/getusers', getAllUsers)
router.get('/getuser/:id', getUser)



export default router;