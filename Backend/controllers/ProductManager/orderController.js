const order = require('../../models/ProductManager/Orders')


//Create order
const createOrder = async(req,res)=>{
    let newOrder = new order(req.body);

    newOrder.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"New Order added!"
        });
    });

}

//get order
const getOrders =  async(req,res)=>{
    order.find().exec((err,orders)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingOrders:orders
        });
    });
}


//get a specific order by id
const getASpecificOrder=async(req,res)=>{
    let orderId = req.params.id;
    order.findById(orderId,(err,order)=>{
        if(err){
            return res.status(400).json({success:false,err});
        }

        return res.status(200).json({
            success:true,
            order
        });
    });

}


//delete order from the system
const deleteOrder = async(req,res)=>{
    order.findByIdAndRemove(req.params.id).exec((err,deletedOrder)=>{
        if(err){
            return res.status(400).json({
                message:"Couldn't delete the order something is wrong!",deletedOrder
            });
        }
        return res.status(200).json({
            success:"Order removed successfully!",deletedOrder
        });
    });
};

module.exports = {
    createOrder,
    getASpecificOrder,
    deleteOrder,
    getOrders
}