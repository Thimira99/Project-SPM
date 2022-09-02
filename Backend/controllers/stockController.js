const Stocks = require ('../models/stock.js')

/* Create stocks */
const createStocks = async (req,res)=>{
    let newStock = new Stocks(req.body);

    newStock.save((err)=>{
       if(err){
           return res.status(400).json({
               error:err
           });
       }

       return res.status(200).json({
           success:"Stocks saved successfully"
       });
    });
}

/* retrieve stocks */
const getStocks = async(req,res)=>{
    try{
        const data = await Stocks.find()
        return res.status(200).send({data:data})
    }catch(err){
        return res.status(500).send({err:err})
    }
    
}

/* update stock details */
const updateStocks = async(req,res)=>{
    Stocks.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,stock)=>{
            if(err){
                return res.status(400).json({
                    error:err
                });
            }
            return res.status(200).json({
                success:"Stock details updated successfully!"
            });
        }
    );
};

/* Delete stocks */
const deleteStocks=async(req,res)=>{
    Stocks.findByIdAndRemove(req.params.id).exec((err,deletedStock)=>{
        if(err){
            return res.status(400).json({
                message:"Couldn't delete the the stock something is wrong!",deletedStock
            });
        }
        return res.status(200).json({
            success:"Stock deleted successfully!",deletedStock
        });
    });
};

module.exports={
    createStocks,
    getStocks,
    updateStocks,
    deleteStocks
}
