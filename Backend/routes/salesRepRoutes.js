const express= require('express');

const router = express.Router()

const { addAcountDetails ,getallAccountDetails ,getDataBySearch ,getShopById} = require('../controllers/SalesPerson/shopController');
const { addInvoiceData,getAllInvoices,getInvoiceNumber } = require('../controllers/SalesPerson/InvvoiceController');


//Account Routes
router.post('/account/post', addAcountDetails);
router.get('/account/get', getallAccountDetails);
router.get('/account/get/:id', getShopById);
router.post('/account/search/post', getDataBySearch);

//InvoiceRoutes
router.post('/Invoice/post', addInvoiceData);
router.get('/Invoice/get', getAllInvoices);
router.post('/Invoice/get/shop', getInvoiceNumber);


module.exports = router;