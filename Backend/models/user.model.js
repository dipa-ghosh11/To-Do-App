import mongoose, { Schema } from "mongoose";
import { userZodSchema } from "../schema/user";

const userSchema=new Schema({
    name:{
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
    projects:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }
})

userSchema.pre("validate", function(next){
    try{
        userZodSchema.parse(this.toObject())
        next();
    }
    catch(error){
        next(new Error(error.errors.map(e=>e.message).join(",")))
    }
})

export const User=mongoose.model("User", userSchema);