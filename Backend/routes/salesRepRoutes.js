const express= require('express');

const router = express.Router()

const { addAcountDetails ,getallAccountDetails ,getDataBySearch ,getShopById} = require('../controllers/SalesPerson/shopController');
const { addInvoiceData,getAllInvoices,getInvoiceNumber ,getInvoiceNumberAndDelete, getInvoiceByNameAndAgent ,getInvoiceByNameAndAgentAndShop } = require('../controllers/SalesPerson/InvvoiceController');
const { getAllInvoiceProductData,addInvoiceProductData ,getInvoiceByNameAndAgentAndShopProduct } = require('../controllers/SalesPerson/InvoiceProductController');


//Account Routes
router.post('/account/post', addAcountDetails);
router.get('/account/get', getallAccountDetails);
router.get('/account/get/:id', getShopById);
router.post('/account/search/post', getDataBySearch);

//InvoiceRoutes
router.post('/Invoice/post', addInvoiceData);
router.get('/Invoice/get', getAllInvoices);
router.post('/Invoice/get/shop', getInvoiceNumber);
router.post('/Invoice/get/shop/delete', getInvoiceNumberAndDelete);
router.post('/Invoice/get/shopByNameAndAgent', getInvoiceByNameAndAgent);
router.post('/Invoice/get/shopByNameAndAgentAndInvoice', getInvoiceByNameAndAgentAndShop);

//InvoiceProduct
router.post('/InvoiceProduct/post', addInvoiceProductData);
router.get('/InvoiceProduct/get', getAllInvoiceProductData);
router.post('/Invoice/get/shopByNameAndAgentAndInvoice/products', getInvoiceByNameAndAgentAndShopProduct);
// router.post('/InvoiceProduct/get/shop', getInvoiceNumber);


module.exports = router;