const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const distributionSchema = new mongoose.Schema({
    distribution_id:{
        type:String,
        required:true
    },
    stock_count:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    assignedRep:{
        type:String,
        required:true
    },
    amount:{
        type:String,
        required:true
    },
    product_id:{
        type:String,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model('Distributions', distributionSchema) //Though it is stocks the cluster will be created as stocks