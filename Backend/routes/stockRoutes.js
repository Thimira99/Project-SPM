const express= require('express');
const { createStocks, getStocks, updateStocks, deleteStocks, createReqStocks, getReqStocks, updateReqStocks, deleteReqStocks } = require('../controllers/stockController');
const router = express.Router()

const Stocks = require('../models/Stock Management/stock')

//create stocks
router.post("/stocks/create",createStocks)

//create stocks
router.post("/request/stocks/create",createReqStocks)

//get stocks
router.get("/retrieve/stocks",getStocks)

//get stocks
router.get("/retrieve/request/stocks",getReqStocks)

//update stock details
router.put("/update/stocks/:id",updateStocks)

//update stock details
router.put("/update/request/stocks/:id",updateReqStocks)

//delete stocks
router.delete("/stocks/delete/:id",deleteStocks)

//delete stocks
router.delete("/request/stocks/delete/:id",deleteReqStocks)


module.exports = router;