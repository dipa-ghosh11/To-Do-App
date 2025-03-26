import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/token.js";
import cookieParser from "cookie-parser";

export const createUser=async(req, res)=>{
    const {name, email, password , role}=req.body;

    if(!name || !email|| !password || !role){
        return res.status(400).json({success: false, message: "All fields are required"});
    }

    const isRegistered= await User.findOne({email});
    if(isRegistered){
        return res.status(400).json({ success: false, message: "User already registered"});
    }

    try {
        const hashedPassword=await bcrypt.hash(password, 10);
        const user =await User.create({ name, email, password: hashedPassword, role });
        //generate token
        const token=generateToken(user);
        
        //data-*/password
        const data =await User.findById(user._id).select("-password");
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });


        return res.status(201).json({ success: true, message: "User registered successfully", data, token})
    } catch (error) {
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
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.status(200).json({success: true, message: "User logged in", data, token});
    }

    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}