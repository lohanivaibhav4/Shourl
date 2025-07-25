import express from 'express'
const router = express.Router()
import URL from '../models/url.js'

router.get('/', async (req, res)=>{
    if(!req.user) return res.redirect('/login')
    const allUrls = await URL.find({createdBy:req.user._id})
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