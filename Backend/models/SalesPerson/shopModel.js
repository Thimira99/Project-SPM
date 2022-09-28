const mongoose = require('mongoose')



const shopSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phonenNmber:{
        type:String,
        required:true
    },
    ownerEmailAddress:{
        type:String,
        required:true
    },
    nicNumber:{
        type:String,
        required:true
    },
    sh_Name:{
        type:String,
        required:true
    },
    sh_RegistrationNumber:{
        type:String,
        required:true
    },
    sh_phoneNumber:{
        type:String,
        required:true
    },
    sh_emailAddress:{
        type:String,
        required:true
    },
    sh_Region:{
        type:String,
        required:true
    },
    sh_PostalCode:{
        type:String,
        required:true
    },
    sh_Address:{
        type:String,
        required:true
    },
    productData:[
        {
            productName:{
                type:String,
                required:false
            },
            productQty:{
                type:String,
                required:false
            },
        }
    ]
},{timestamps:true});

const shop = mongoose.model('SR_Shops', shopSchema) //Though it is stocks the cluster will be created as stocks
module.exports = shop;