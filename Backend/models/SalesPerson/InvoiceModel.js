const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const InvoiceSchema = new mongoose.Schema({
    InvoiceNumber:{
        type:String,
        required:true
    },
    ShopName:{
        type:String,
        required:true
    },
    AgentNumber:{
        type:String,
        required:true
    },
    Time:{
        type:String,
        required:true
    },
    Date:{
        type:String,
        required:true
    },
    
},{timestamps:true});

module.exports = mongoose.model('sr_invoice', InvoiceSchema);