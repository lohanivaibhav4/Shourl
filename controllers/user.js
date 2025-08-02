import USER from "../models/user.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import { configDotenv } from "dotenv";
configDotenv()

export async function handleUserRegistration(req, res){
    const { name, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await new USER({
        name,
        email,
        password: hashedPassword
    })
    newUser
    .save()
    .then((newUser)=>res.redirect('/'))
    .catch((err)=>console.error('Error Creating New User', err))
    
}
export async function handleUserLogin(req, res){
    const { email, password } = req.body
    const user = await USER.findOne({email})
    if(!user){
        return res.render("login",{
            title:'Login',
            error: "Invalid Username Or Password"
        })
    }
    const passwordMatched = await bcrypt.compare(password, user.password)

    if(!passwordMatched){
        return res.render("login",{
            title:'Login',
            error: "Invalid Username Or Password"
        })
    }
    const token = jwt.sign({ _id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, {expiresIn:"30d"})
    res.cookie("token", token)
    res.redirect('/')
    
}
export async function handleUserLogout(req, res){
    res.clearCookie('token')
    res.redirect('/login?msg=Logged out successfully');
}
