import express from 'express'
const router = express.Router()
import URL from '../models/url.js'
import authRequired from '../middlewares/authRequired.js'
import mongoose from 'mongoose'
import checkAuthorization from '../services/checkAuthorization.js'



router.get('/admin/urls', checkAuthorization, async (req, res)=>{
    const allUrls = await URL.find({})
    res.render('home',{
        title:'Admin',
        loggedIn:true,
        urls: allUrls
    })
})


router.get('/', authRequired ,async (req, res)=>{
    if(!req.user) return res.redirect('/login')
    const userId = new mongoose.Types.ObjectId(req.user._id)
    const allUrls = await URL.find({createdBy:userId})
    
    res.render('home',{
        msg:req.query.msg,
        loggedIn:true,
        title:'Shourl',
        urls: allUrls
    })
})

router.get('/register', async(req, res)=>{
    res.render('register', { title:'Register'})
})

router.get('/login', async(req, res)=>{
    res.render('login', { title:'Login'})
})

const staticRouter = router
export default staticRouter