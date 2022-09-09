const express= require('express');
const { createDistributions, getDistributions, updateDistributions, deleteDistributions, createCompanies, getCompanies, updateCompanies, deleteCompanies } = require('../controllers/distributionControllers');
const router = express.Router()


//create stocks
router.post("/distribution/create",createDistributions)

//create companies
router.post("/companies/create",createCompanies)


//get stocks
router.get("/retrieve/distributions",getDistributions)

//get companies
router.get("/retrieve/companies",getCompanies)

//update stock details
router.put("/update/distribution/:id",updateDistributions)

//update company details
router.put("/update/company/:id",updateCompanies)

//delete stocks
router.delete("/distribution/delete/:id",deleteDistributions)

//delete company
router.delete("/company/delete/:id",deleteCompanies)


module.exports = router;