const mongoose = require('mongoose')
var Float = require('mongoose-float').loadType(mongoose);

const productSchema = new mongoose.Schema({
    dateCreated:{
        type:String,
        required:true
    },
    productId:{
        type:String,
        required:true
    },
    productName:{
        type:String,
        required:true
    },
    productType:{
        type:String,
        required:true
    },
    quantity:{
        type:String,
        required:true
    },
    weight:{
        type:String,
        required:true
    },
    price:{
        type:Float,
        required:true
    },
},{timestamps:true});

module.exports = mongoose.model('Products', productSchema)  