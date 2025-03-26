import mongoose from "mongoose";

export const dbConnection=()=>{
    mongoose
        .connect(process.env.ATLAS_URI, {dbName: "Task-5", family:4})
        .then(()=>{
            console.log("Database connected successfully")
        })
        .catch(err=>{
            console.log("error connecting to db", err)
        })
}