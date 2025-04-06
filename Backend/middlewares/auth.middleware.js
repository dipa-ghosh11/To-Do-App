import { User } from "../models/user.model.js";
import { verifyToken } from "../utils/token.js";


export const verifyAuth= async(req, res, next)=>{
    try {
        const token=req.cookies.adminToken || req.cookies.userToken;

        if (!token) return res.status(401).json({ success: false, message: "Unauthorized request" })
        // console.log(token)
        const decodeToken=verifyToken(token);
        // console.log(decodeToken)
        
        const user=await User.findById(decodeToken._id).select("-password");

        if (!user) return res.status(401).json({ success: false, message: "Invalid access token" });

        req.user = user;
        next(); 
    } catch (error) {
        res.status(500).json({ success: false, message: error?.message || "Internal server error" })
    }
}

export const verifyAdmin=async(req, res, next)=>{
    try {
        const token=req.cookies?.adminToken;

        if (!token) return res.status(401).json({ success: false, message: "Unauthorized Admin" });

        const decodeToken=verifyToken(token);

        const user = await User.findById(decodeToken._id).select("-password");

        if (!user) return res.status(401).json({ success: false, message: "Invalid access token" });

        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({ success: false, message: error?.message || "Internal server error" })
    }
}
export const verifyUser=async(req, res, next)=>{
    try {
        const token=req.cookies?.userToken;

        if (!token) return res.status(401).json({ success: false, message: "Unauthorized user" });

        const decodeToken=verifyToken(token);

        const user = await User.findById(decodeToken._id).select("-password");

        if (!user) return res.status(401).json({ success: false, message: "Invalid access token" });

        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({ success: false, message: error?.message || "Internal server error" })
    }
}