import express from "express";
import {createServer} from "node:http";
//
//npm run dev se start hoga
//
import {Server} from "socket.io";
import connectToSocket from "./src/controllers/socketManager.js";

import mongoose from "mongoose";

import cors from "cors";
import userRoutes from "./src/routes/users.routes.js";


const app =express();
const server=createServer(app);
const io=connectToSocket(server);



app.set("port",(process.env.PORT||8000))
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:true}));


app.use("/api/v1/users",userRoutes);
//app.use("api/v2/users",newUserRoutes) this used for multiple version i.e new update

const start=async()=>{
    const connectionDb=await mongoose.connect("mongodb+srv://foranurag0202:dragmas4444@cluster0.lapngdd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");


    server.listen(app.get("port"),()=>{
        console.log("app sun rhe hai port 8000");
    });
}

start();