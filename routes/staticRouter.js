import express from 'express'
const router = express.Router()
import URL from '../models/url.js'
import authRequired from '../middlewares/authRequired.js'
import mongoose from 'mongoose'

router.get('/', authRequired ,async (req, res)=>{
    if(!req.user) return res.redirect('/login')
    const userId = new mongoose.Types.ObjectId(req.user._id)
    const allUrls = await URL.find({createdBy:userId})
    
    res.render('home',{
        urls: allUrls
    })
})
router.get('/register', async(req, res)=>{
    res.render('register')
})
router.get('/login', async(req, res)=>{
    res.render('login')
})
const staticRouter = router
export default staticRouter