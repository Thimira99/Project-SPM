const Distributions = require ('../models/Distribution Management/distributions')
const Company =  require('../models/Distribution Management/company')
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

/* Create companies */
const createCompanies = async (req,res)=>{
    let newCompanies = new Company(req.body);

    newCompanies.save((err)=>{
       if(err){
           return res.status(400).json({
               error:err
           });
       }

       return res.status(200).json({
           success:"Company details saved successfully"
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

/* retrieve companies */
const getCompanies = async(req,res)=>{
    try{
        const data = await Company.find()
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

/* update company details */
const updateCompanies = async(req,res)=>{
    Company.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,company)=>{
            if(err){
                return res.status(400).json({
                    error:err
                });
            }
            return res.status(200).json({
                success:"Company details updated successfully!"
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

/* Delete companies */
const deleteCompanies=async(req,res)=>{
    Company.findByIdAndRemove(req.params.id).exec((err,deletedCompany)=>{
        if(err){
            return res.status(400).json({
                message:"Couldn't delete the company something is wrong!",deletedCompany
            });
        }
        return res.status(200).json({
            success:"Company deleted successfully!",deletedCompany
        });
    });
};

module.exports={
    createDistributions,
    createCompanies,
    getDistributions,
    getCompanies,
    updateDistributions,
    updateCompanies,
    deleteDistributions,
    deleteCompanies
}
