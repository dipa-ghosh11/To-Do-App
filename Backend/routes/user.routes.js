import express from "express"
import { createUser, deleteUser, getAllUsers, getUser, loginUser, logoutUser } from "../controllers/user.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";

const router=express.Router();

router.post('/register', createUser)
router.post('/login', loginUser)
router.post('/logout', verifyAuth, logoutUser)
router.get('/getusers', getAllUsers)
router.get('/getuser/:id', getUser)
router.delete('/delete/:id', deleteUser);



export default router;