import mongoose, { model } from "mongoose";


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
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'USER'
    }
 },{timestamps:true})

 const URL =  mongoose.model('URL', urlSchema)
 export default URL 