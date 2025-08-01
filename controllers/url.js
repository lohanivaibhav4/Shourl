import { nanoid } from 'nanoid'
import URL from '../models/url.js'
import mongoose from 'mongoose'

export async function handleGenerateShortURL(req, res){
    const body = req.body
    if(!body){
        res.status(401).json({error:"Redirect URL Required!"})
    }
    
    const newEntry = await new URL({
        shortId: nanoid(8),
        redirectUrl: body.redirectUrl,
        createdBy:req.user._id
    })
    await newEntry
    .save()
    .then((newEntry)=>{
        res.render('home',{
            title:'Generated',
            id:newEntry.shortId
        })
    })
    .catch((err)=>{
        console.log(err)
        return res.status(500)
    })

}
export async function handleRedirectToRealURL(req, res){
    const shortId = req.params.id
    const urlEntry = await URL.findOneAndUpdate({shortId},{
        $push:{
            visitHistory:Date.now()
        }
    })
    
    res.redirect(`https://${urlEntry.redirectUrl}`)
}
export async function handleGetURLVisitHistory(req, res){
    const shortId = req.params.id
    const urlEntry = await URL.findOne({shortId})
    res.json(urlEntry.visitHistory)
}

