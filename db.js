import mongoose from "mongoose";

async function connectDB(uri){
    mongoose
    .connect(uri)
    .then(()=> console.log("Database Connected"))
    .catch((err)=> console.log("Error Connecting To Database", err))
}

export default connectDB
