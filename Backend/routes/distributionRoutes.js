const express= require('express');
const { createDistributions, getDistributions, updateDistributions, deleteDistributions } = require('../controllers/distributionControllers');
const router = express.Router()


//create stocks
router.post("/distribution/create",createDistributions)

//get stocks
router.get("/retrieve/distributions",getDistributions)

//update stock details
router.put("/update/distribution/:id",updateDistributions)

//delete stocks
router.delete("/distribution/delete/:id",deleteDistributions)


module.exports = router;