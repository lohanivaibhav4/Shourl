import USER from "../models/user.js";
import mongoose from "mongoose";

export async function handleUserRegistration(req, res){
    const { name, email, password } = req.body
    const newUser = await new USER({
        name,
        email,
        password
    })
    newUser
    .save()
    .then((newUser)=>res.redirect('/'))
    .catch((err)=>console.error('Error Creating New User', err))
    
}
export async function handleUserLogin(req, res){
    const { email, password } = req.body
    const user = await USER.findOne({email, password})
    if(!user){
        return res.render("login",{
            error: "Invalid Username Or Password"
        })
    }
    res.redirect('/')
}