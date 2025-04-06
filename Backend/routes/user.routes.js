import express from "express"
import { createUser, deleteUser, getAllUsers, getUser, loginUser, logoutUser, updateUser, verify } from "../controllers/user.controller.js";
import { verifyAdmin, verifyAuth, verifyUser } from "../middlewares/auth.middleware.js";

const router=express.Router();

router.post('/register', createUser)
router.post('/login', loginUser)
router.post('/logout', verifyAuth, logoutUser)
router.get('/getusers', verifyAdmin, getAllUsers)
router.get('/getuser/:id', verifyAdmin, getUser)
router.put('/updateuser/:id', verifyAdmin, updateUser)
router.delete('/delete/:id', verifyAdmin, deleteUser)
router.get("/verify", verify);



export default router;