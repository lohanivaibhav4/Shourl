import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import { configDotenv } from 'dotenv';
import connectDB from './db.js';
import urlRouter from './routes/url.js';
import staticRouter from './routes/staticRouter.js';
import userRouter from './routes/user.js';
import cookieParser from 'cookie-parser';
import authRequired from './middlewares/authRequired.js';


configDotenv()
const app = express();
const PORT = process.env.PORT || "3000"

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

//MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

//CONNECT DB
connectDB(process.env.MONGO_URI)

//ROUTES
app.use('/url', authRequired, urlRouter)
app.use('/', staticRouter)
app.use('/user', userRouter)


//START SERVER
app.listen(PORT,()=>{
    console.log(`Server Started At Port ${PORT}`)
})