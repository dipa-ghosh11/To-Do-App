import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/token.js";
import mongoose from "mongoose";

export const createUser=async(req, res)=>{
    const {fullName, email, password , role}=req.body;

    if(!fullName || !email|| !password || !role){
        return res.status(400).json({success: false, message: "All fields are required"});
    }

    const isRegistered= await User.findOne({email});
    if(isRegistered){
        return res.status(400).json({ success: false, message: "User already registered"});
    }

    try {
        const hashedPassword=await bcrypt.hash(password, 10);
        const user =await User.create({ fullName, email, password: hashedPassword, role });
        //generate token
        const token=generateToken(user);
        
        //data-*/password
        const data =await User.findById(user._id).select("-password");
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
           
        });


        return res.status(201).json({ success: true, message: "User registered successfully", data, token})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Error creating user", error:error.message });
    }


}


export const loginUser= async (req, res)=>{
    try{
        const {email, password, role}=req.body;
        if(!email || !password)
        {
            return res.status(400).json({success: false, message: "All fields are required"});
        }

        const user = await User.findOne({ email });
        if(!user)
        {
            return res.status(400).json({success: false, message: "Please entered a registered email"});
        }

        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ success: false, message: "Please enter correct password" });
        }

        if (role !== user.role) {
            return res.status(400).json({ success: false, message: "User with this role is not found" });
        }

        
       
        const cookieName = user.role === "admin" ? "adminToken" : "userToken";
        const data = await User.findById(user._id).select("-password");
        const token = generateToken(user);
        res.cookie(cookieName, token, {
            httpOnly: true,
            secure: true,
           
        });

        res.status(200).json({success: true, message: "User logged in", data, token});
    }

    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


export const logoutUser=async (req, res)=>{
    if(req.cookies.adminToken)
    {
        res.cookie("adminToken", "",{
            httpOnly: true,
            expires: new Date(Date.now())
        })

        res.status(200).json({
            success: true,
            message: "Admin Logged Out Successfully.",
        })
    }

    else{
        res.cookie("userToken", "", {
            httpOnly: true,
            expires: new Date(Date.now())
        })

        res.status(200).json({
            success: true,
            message: "User Logged Out Successfully.",
        })
    }
}


export const getAllUsers=async(req, res)=>{
    try{
        const users=await User.find({role: "user"});

        if(!users){
            return res.status(400).json({success: false, message: "No users found"});
        }

        res.status(200).json({success: true, message: "Users fetched successfully", users});
    }

    catch(error){
        res.status(500).json({success: false, message: "Internal server error"})
    }
}


export const getUser=async(req, res)=>{
    try{
        const user = await User.findById(req.params.id).select("-password");

        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ success: false, message: "Invalid User ID" });
        }

        if(!user){
            return res.status(404).json({ success: false, message: "User not found" })
        }

        res.status(200).json({ success: true, message: "User fetched successfully", user });
    }

    catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" , error:error.message})
    }
}


export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.status(200).json({ success: true, message: "User deleted successfully" });
    }

    catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" , error:error.message});
    }

}