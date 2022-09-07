const express = require('express')
const { postSupplier, getSuppliers, getASupplier, deleteSupplier, updateSupplier } = require('../controllers/supplierController')
const router = express.Router()
   
 

/*Supplier routes */

router.post("/supplier/post", postSupplier)
router.get("/supplier/get", getSuppliers)
router.get("/supplier/get/:id", getASupplier)
router.delete("/supplier/delete/:id", deleteSupplier)
router.put("/supplier/update/:id", updateSupplier)
 
 

module.exports = router

