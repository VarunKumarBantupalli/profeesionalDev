// require('dotenv').config({path:'./env'})

import connectDB from "./db/index.js";
import dotenv from "dotenv"
import express from "express";

dotenv.config({
    path:"./env"
})

const app = express();
connectDB()
.then(()=>{
   app.listen(process.env.PORT || 8000,()=>{
    console.log(`server is running at ${process.env.PORT}`);
   })
})
.catch((err)=>{
     console.log('MONGODB CONNECTION FAILED',err);
     
})
/*
import mongoose from "mongoose"   
import { DB_NAME } from "./constants";
import express from "express"

;(async ()=>{
    try {
      await  mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
      application.on("error",(error)=>{
        console.log('ERROR:',error);
        throw error
        
      })
 
     application.listen(process.env.PORT,()=>{
        console.log(`the server is listening at ${PORT}`);
        
     })

    } catch (error) {
        console.error("ERROR: ",error);
        throw err
    }
})()*/