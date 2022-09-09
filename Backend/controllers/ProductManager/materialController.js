const material = require('../../models/ProductManager/Materials')

/*create material*/
const postMaterial = async(req,res)=>{
    let newMaterial = new material(req.body);

    newMaterial.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"New Material successfully added !"
        });
    });

}

//get all materials
const getMaterials =  async(req,res)=>{
    material.find().exec((err,materials)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingMaterials:materials
        });
    });
}


//get a specific material by id
const getAMaterial=async(req,res)=>{
    let materialId = req.params.id;
    material.findById(materialId,(err,material)=>{
        if(err){
            return res.status(400).json({success:false,err});
        }

        return res.status(200).json({
            success:true,
            material
        });
    });

}


//update material details
const updateMaterial = async(req,res)=>{
    material.findByIdAndUpdate(
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
                success:"Material details updated successfully!"
            });
        }
    )
}

//delete material 
const deleteMaterial = async(req,res)=>{
    material.findByIdAndRemove(req.params.id).exec((err,deletedMaterial)=>{
        if(err){
            return res.status(400).json({
                message:"Couldn't delete the Material something is wrong!",deletedMaterial
            });
        }
        return res.status(200).json({
            success:"Material is removed successfully!",deletedMaterial
        });
    });
};

module.exports = {
    postMaterial,
    getMaterials,
    getAMaterial,
    updateMaterial,
    deleteMaterial
}