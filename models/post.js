const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String, // url 
        required:true
    },
    postedBy:{
        // building relations in mongo db
        type:ObjectId,
        ref:"USER"
    }
})

mongoose.model("POST",postSchema)