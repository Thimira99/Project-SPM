const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const companySchema = new mongoose.Schema({
    reg_id:{
        type:String,
        required:true
    },
    company_name:{
        type:String,
        required:true
    },
    company_address:{
        type:String,
        required:true
    },
    regDate:{
        type:String,
        required:true
    },
    
},{timestamps:true});

module.exports = mongoose.model('Companies', companySchema)