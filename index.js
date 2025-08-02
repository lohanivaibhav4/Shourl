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
import expressLayouts from 'express-ejs-layouts';
import { fileURLToPath } from 'url';

// Fix __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


configDotenv()
const app = express();
const PORT = process.env.PORT || "3000"

//VIEW ENGINE
app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))
app.use(expressLayouts);
app.set('layout', 'layout');

//MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())


app.use(express.static(path.join(__dirname, 'public')));

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