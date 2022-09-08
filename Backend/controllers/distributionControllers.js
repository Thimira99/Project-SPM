const Distributions = require ('../models/Distribution Management/distributions')

/* Create distributions */
const createDistributions = async (req,res)=>{
    let newDistributions = new Distributions(req.body);

    newDistributions.save((err)=>{
       if(err){
           return res.status(400).json({
               error:err
           });
       }

       return res.status(200).json({
           success:"Distribution details saved successfully"
       });
    });
}

/* retrieve distributions */
const getDistributions = async(req,res)=>{
    try{
        const data = await Distributions.find()
        return res.status(200).send({data:data})
    }catch(err){
        return res.status(500).send({err:err})
    }
    
}


/* update distribution details */
const updateDistributions = async(req,res)=>{
    Distributions.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,distributions)=>{
            if(err){
                return res.status(400).json({
                    error:err
                });
            }
            return res.status(200).json({
                success:"Distribution details updated successfully!"
            });
        }
    );
};

/* Delete distributions */
const deleteDistributions=async(req,res)=>{
    Distributions.findByIdAndRemove(req.params.id).exec((err,deletedDistribution)=>{
        if(err){
            return res.status(400).json({
                message:"Couldn't delete the distribution something is wrong!",deletedDistribution
            });
        }
        return res.status(200).json({
            success:"Distribution deleted successfully!",deletedDistribution
        });
    });
};

module.exports={
    createDistributions,
    getDistributions,
    updateDistributions,
    deleteDistributions,
}
