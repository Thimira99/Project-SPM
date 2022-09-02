const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const reqStockSchema = new mongoose.Schema({
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
    DueDate:{
        type:String,
        required:true
    },
    qty:{
        type:String,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model('RequestStocks', reqStockSchema) //Though it is stocks the cluster will be created as stocks