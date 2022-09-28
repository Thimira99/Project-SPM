const product = require('../../models/ProductManager/Products')

/*create product*/
const postProduct = async(req,res)=>{
    let newProduct = new product(req.body);

    newProduct.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"New Product successfully added !"
        });
    });

}

//get all products
const getProducts =  async(req,res)=>{
    product.find().exec((err,products)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingProducts:products
        });
    });
}


//get a specific material by id
const getAProduct=async(req,res)=>{
    let productId = req.params.id;
    product.findById(productId,(err,product)=>{
        if(err){
            return res.status(400).json({success:false,err});
        }

        return res.status(200).json({
            success:true,
            product
        });
    });

}


//update product details
const updateProduct = async(req,res)=>{
    product.findByIdAndUpdate(
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
                success:"Product details updated successfully!"
            });
        }
    )
}

//delete product 
const deleteProduct = async(req,res)=>{
    product.findByIdAndRemove(req.params.id).exec((err,deletedProduct)=>{
        if(err){
            return res.status(400).json({
                message:"Couldn't delete the Product something is wrong!",deletedProduct
            });
        }
        return res.status(200).json({
            success:"Product is removed successfully!",deletedProduct
        });
    });
};

module.exports = {
    postProduct,
    getProducts,
    getAProduct,
    updateProduct,
    deleteProduct
}