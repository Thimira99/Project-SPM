const supplier = require('../../models/ProductManager/Suppliers')

/*create supplier*/
const postSupplier = async(req,res)=>{
    let newSupplier = new supplier(req.body);

    newSupplier.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"New Supplier successfully added !"
        });
    });

}

//get all suppliers
const getSuppliers =  async(req,res)=>{
    supplier.find().exec((err,suppliers)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingSuppliers:suppliers
        });
    });
}


//get a specific supplier by id
const getASupplier=async(req,res)=>{
    let supplierId = req.params.id;
    supplier.findById(supplierId,(err,supplier)=>{
        if(err){
            return res.status(400).json({success:false,err});
        }

        return res.status(200).json({
            success:true,
            supplier
        });
    });

}


//update supplier details
const updateSupplier = async(req,res)=>{
    supplier.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err)=>{
            if(err){
                return res.status(400).json({
                    error:err
                });
            }
            return res.status(200).json({
                success:"Supplier details updated successfully!"
            });
        }
    )
}

//delete supplier 
const deleteSupplier = async(req,res)=>{
    supplier.findByIdAndRemove(req.params.id).exec((err,deletedSupplier)=>{
        if(err){
            return res.status(400).json({
                message:"Couldn't delete the Supplier something is wrong!",deletedSupplier
            });
        }
        return res.status(200).json({
            success:"Supplier is removed successfully!",deletedSupplier
        });
    });
};

module.exports = {
    postSupplier,
    getSuppliers,
    getASupplier,
    updateSupplier,
    deleteSupplier
}