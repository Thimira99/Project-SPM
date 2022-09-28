const express= require('express');

const router = express.Router()

const { addAcountDetails ,getallAccountDetails ,getDataBySearch ,getShopById} = require('../controllers/SalesPerson/shopController');


router.post('/account/post', addAcountDetails);
router.get('/account/get', getallAccountDetails);
router.get('/account/get/:id', getShopById);
router.post('/account/search/post', getDataBySearch);

module.exports = router;