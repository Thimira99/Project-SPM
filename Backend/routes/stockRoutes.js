const express= require('express');
const { createStocks, getStocks, updateStocks, deleteStocks } = require('../controllers/stockController');
const router = express.Router()

const Stocks = require('../models/stock')

//create stocks
router.post("/stocks/create",createStocks)

//get stocks
router.get("/retrieve/stocks",getStocks)

//update stock details
router.put("/update/stocks/:id",updateStocks)

//delete stocks
router.delete("/stocks/delete/:id",deleteStocks)


module.exports = router;