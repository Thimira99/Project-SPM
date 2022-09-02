const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const stockSchema = new mongoose.Schema({
    product_id:{
        type:String,
        required:true
    },
    product_type:{
        type:String,
        required:true
    },
    product_name:{
        type:String,
        required:true
    },
    regular_price:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    stock_count:{
        type:String,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model('Stocks', stockSchema) //Though it is stocks the cluster will be created as stocks