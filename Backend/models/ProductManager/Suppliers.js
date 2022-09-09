const mongoose = require('mongoose')

const supplierSchema = new mongoose.Schema({
    dateCreated:{
        type:String,
        required:true
    },
    supplierId:{
        type:String,
        required:true
    },
    supplier:{
        type:String,
        required:true
    },
    contactPerson:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
},{timestamps:true});

module.exports = mongoose.model('Suppliers', supplierSchema)  