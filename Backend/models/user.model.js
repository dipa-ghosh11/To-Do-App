import mongoose, { Schema } from "mongoose";
import { userZodSchema } from "../schema/user.js";

const userSchema=new Schema({
    fullName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true,
        enum: ["user", "admin"]
    },
    isActive:{
        type: Boolean,
        default: true,
    }
},{timestamps: true})

userSchema.pre("validate", function(next){
    try{
        userZodSchema.parse(this.toObject())
        next();
    }
    catch(error){
        next(new Error(error.errors.map(e=>e.message).join(",")))
    }
})

userSchema.methods.validatePassword=async function (password) {
    const user=this;
    return await bcrypt.compare(password, user.password);
};

export const User=mongoose.model("User", userSchema);