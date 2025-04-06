import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/token.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"

export const createUser=async(req, res)=>{
    const {fullName, email, password , role, isActive}=req.body;

    // if(!fullName || !email|| !password || !role){
    //     return res.status(400).json({success: false, message: "All fields are required"});
    // }

    const isRegistered= await User.findOne({email});
    if(isRegistered){
        return res.status(400).json({ success: false, message: "User already registered"});
    }

    try {
        const hashedPassword=await bcrypt.hash(password, 10);
        const user =await User.create({ fullName, email, password: hashedPassword, role, isActive });
        //generate token
        const token=generateToken(user);
        
        //data-*/password
        const data = await User.findById(user._id).select("-password");
        const cookieName = role === "admin" ? "adminToken" : "userToken";
        res.cookie(cookieName, token, {
            httpOnly: true,
            secure: true,
           
        });


        return res.status(201).json({ success: true, message: "User registered successfully", data, token})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Error creating user", error:error.message });
    }


}


export const loginUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Validate required fields
        if (!email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "Email, password, and role are required"
            });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Verify role
        if (role !== user.role) {
            return res.status(403).json({
                success: false,
                message: "Access denied. Invalid role for this user."
            });
        }

        // Check if user is active
        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                message: "Your account has been deactivated. Please contact support."
            });
        }

        // Generate token and get user data without password
        const token = generateToken(user);
        const userData = await User.findById(user._id).select("-password");

        // Set cookie based on role
        const cookieName = role === "admin" ? "adminToken" : "userToken";
        res.cookie(cookieName, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        // Send success response
        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: userData
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};


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


export const updateUser= async(req, res)=>{
    try {    
        const userId=req.params.id;
        const updateUser = await User.findByIdAndUpdate(userId, req.body, { new: true, runValidators: true, context: 'query'});

        if(!updateUser){
            return res.status(404).json({success: false, message: "User not found"});
        }

        res.status(200).json({success: true, message: "User updated successfully"})
    } catch (error) {
        res.status(500).json({success: false, message: "Internal server error", error: error.message})  

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

export const verify = async (req, res) => {
    try {
        const token = req.cookies.adminToken || req.cookies.userToken; 

        if (!token) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded._id).select("-password"); 

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};