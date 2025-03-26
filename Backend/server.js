import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";

const app=express();
dotenv.config();
app.use(express.json())
app.use(cors());
app.use(cookieParser())

dbConnection();

app.use("/api/user",userRoutes);

app.listen(process.env.PORT, ()=>{
    console.log(`App is listening on port ${process.env.PORT}`);
} )