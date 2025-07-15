import express from 'express'
import mongoose from 'mongoose'
import { configDotenv } from 'dotenv';
import connectDB from './db.js';
import urlRouter from './routes/url.js';
configDotenv()
const app = express();
const PORT = process.env.PORT || "3000"


//MIDDLEWARES
app.use(express.json())

//CONNECT DB
connectDB(process.env.MONGO_URI)

//ROUTES
app.use('/url',urlRouter)


//START SERVER
app.listen(PORT,()=>{
    console.log(`Server Started At Port ${PORT}`)
})