const mongoose = require('mongoose')

const materialSchema = new mongoose.Schema({
    dateCreated:{
        type:String,
        required:true
    },
    materialId:{
        type:String,
        required:true
    },
    supplier:{
        type:String,
        required:true
    },
    cost:{
        type:String,
        required:true
    },
    weight:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
},{timestamps:true});

module.exports = mongoose.model('Materials', materialSchema)  