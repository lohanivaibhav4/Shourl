import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import { configDotenv } from 'dotenv';
import connectDB from './db.js';
import urlRouter from './routes/url.js';
import staticRouter from './routes/staticRouter.js';

configDotenv()
const app = express();
const PORT = process.env.PORT || "3000"

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

//MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//CONNECT DB
connectDB(process.env.MONGO_URI)

//ROUTES
app.use('/url',urlRouter)
app.use('/', staticRouter)


//START SERVER
app.listen(PORT,()=>{
    console.log(`Server Started At Port ${PORT}`)
})