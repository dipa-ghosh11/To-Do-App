import jwt from "jsonwebtoken"




export const generateToken = (user) => {
    const token = jwt.sign(
        {   _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role 
        },
        process.env.JWT_SECRET,  
        { expiresIn: "1d" }
    );
    return token;
};

export const verifyToken=(token)=>{
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
}