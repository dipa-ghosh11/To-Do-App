import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import projectRoutes from "./routes/project.routes.js"
import taskRoutes from "./routes/task.routes.js"

const app=express();
dotenv.config();
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

dbConnection();

app.use("/api/user",userRoutes);
app.use("/api/project", projectRoutes)
app.use("/api/task", taskRoutes)

app.listen(process.env.PORT, ()=>{
    console.log(`App is listening on port ${process.env.PORT}`);
} )