const express = require('express')
const { postSupplier, getSuppliers, getASupplier, deleteSupplier, updateSupplier } = require('../controllers/ProductManager/supplierController')
const router = express.Router()
const { postMaterial, getMaterials, getAMaterial, deleteMaterial, updateMaterial } = require('../controllers/ProductManager/materialController')
const { postProduct, getProducts, getAProduct, deleteProduct, updateProduct } = require('../controllers/ProductManager/productController')
 
   
 

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
 
/*Product routes */

router.post("/product/post", postProduct)
router.get("/product/get", getProducts)
router.get("/product/get/:id", getAProduct)
router.delete("/product/delete/:id", deleteProduct)
router.put("/product/update/:id", updateProduct)
 
module.exports = router

