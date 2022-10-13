const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const InvoiceProducts = new mongoose.Schema({
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
    TotalAmount: {
        type: String,
        required: false,
        trim: true
    },
    productData:[
        {
            qty: {
                type: String,
                required: false,
                trim: true
            },
            amount: {
                type: String,
                required: false,
                trim: true
            },
            price: {
                type: String,
                required: false,
                trim: true
            },
            itemname: {
                type: String,
                required: false,
                trim: true
            },
        }
    ]
   
    
},{timestamps:true});

module.exports = mongoose.model('sr_invoiceWithProducts', InvoiceProducts);