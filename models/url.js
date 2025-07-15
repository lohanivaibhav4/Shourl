import mongoose from "mongoose";


const urlSchema = mongoose.Schema({
    shortId : {
        type:String,
        required:true,
        unique:true
    },
    redirectUrl:{
        type:String,
        required:true,
    },
    visitHistory:{
        type:[Date()],
        default:[]
    }
 },{timestamps:true})

 const URL =  mongoose.model('URL', urlSchema)
 export default URL 