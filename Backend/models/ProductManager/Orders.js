const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    orderCode:{
        type:String,
        required:true
    },
    orderDate:{
        type:String,
        required:true
    },
    supplierId:{
        type:String,
        required:true
    },
    contactPerson:{
        type:String,
        required:true
    },
    supplierEmail:{
        type:String,
        required:true
    },
    materialItem: [
        {
            materialItem: {
             type: String,
             required: true
            }
         }
 
 ],
    weight:{
        type:String,
        required:true
    },
     
},{timestamps:true});

module.exports = mongoose.model('Orders', orderSchema)  