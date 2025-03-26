import jwt from "jsonwebtoken"

const secret=process.env.JWT_SECRET;

// export const generateToken = (user) => {
//     const payload = {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//     };
//     return jwt.sign(payload, secret, { expiresIn: '1h' });
// }

export const generateToken = (user) => {
    const token = jwt.sign(
        {   id: user._id,
            name: user.name,
            email: user.email,
            role: user.role 
        },
        process.env.JWT_SECRET,  
        { expiresIn: "1d" }
    );
    return token;
};