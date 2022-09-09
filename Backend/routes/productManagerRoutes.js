const express = require('express')
const { postSupplier, getSuppliers, getASupplier, deleteSupplier, updateSupplier } = require('../controllers/ProductManager/supplierController')
const router = express.Router()
const { postMaterial, getMaterials, getAMaterial, deleteMaterial, updateMaterial } = require('../controllers/ProductManager/materialController')
 
   
 

/*Supplier routes */

router.post("/supplier/post", postSupplier)
router.get("/supplier/get", getSuppliers)
router.get("/supplier/get/:id", getASupplier)
router.delete("/supplier/delete/:id", deleteSupplier)
router.put("/supplier/update/:id", updateSupplier)
 

/*Material routes */

router.post("/material/post", postMaterial)
router.get("/material/get", getMaterials)
router.get("/material/get/:id", getAMaterial)
router.delete("/material/delete/:id", deleteMaterial)
router.put("/material/update/:id", updateMaterial)
 

module.exports = router

