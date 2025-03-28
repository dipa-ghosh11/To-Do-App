import express from "express"
import { createUser, deleteUser, getAllUsers, getUser, loginUser, logoutUser, updateUser } from "../controllers/user.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";

const router=express.Router();

router.post('/register', createUser)
router.post('/login', loginUser)
router.post('/logout', verifyAuth, logoutUser)
router.get('/getusers', getAllUsers)
router.get('/getuser/:id', getUser)
router.put('/updateuser/:id', updateUser)
router.delete('/delete/:id', deleteUser);



export default router;