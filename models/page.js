const mongoose = require('mongoose')

// page schema

const Schema = mongoose.Schema

const PageSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    slug:{
        type:String
        
    },
    content:{
        type:String,
        required:true
    },
    sorting:{
        type:Number
    },
    date:{
        type:Date,
        default:Date.now()
    }
})
module.exports = Page = mongoose.model('page',PageSchema)