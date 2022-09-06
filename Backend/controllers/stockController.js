const Stocks = require ('../models/stock.js')
const reqStocks = require ('../models/reqStocks.js')
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

/* Create Req stocks */
const createReqStocks = async (req,res)=>{
    let newReqStock = new reqStocks(req.body);

    newReqStock.save((err)=>{
       if(err){
           return res.status(400).json({
               error:err
           });
       }

       return res.status(200).json({
           success:"Request created successfully"
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

/* retrieve req stocks */
const getReqStocks = async(req,res)=>{
    try{
        const data = await reqStocks.find()
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

/* update req stock details */
const updateReqStocks = async(req,res)=>{
    reqStocks.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,reqStock)=>{
            if(err){
                return res.status(400).json({
                    error:err
                });
            }
            return res.status(200).json({
                success:"Requested stock details updated successfully!"
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

/* Delete req stocks */
const deleteReqStocks=async(req,res)=>{
    reqStocks.findByIdAndRemove(req.params.id).exec((err,deletedReqStock)=>{
        if(err){
            return res.status(400).json({
                message:"Couldn't delete the the request something is wrong!",deletedReqStock
            });
        }
        return res.status(200).json({
            success:"Request deleted successfully!",deletedReqStock
        });
    });
};

module.exports={
    createStocks,
    createReqStocks,
    getStocks,
    getReqStocks,
    updateStocks,
    updateReqStocks,
    deleteStocks,
    deleteReqStocks
}
