const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const stock_routes = require("./routes/stockRoutes")
const productManagerRoutes = require("./routes/productManagerRoutes")
const app = express()
dotenv.config()
require ('./DB/DB.js');


//app middlewares
app.use(cors())
app.use(express.json())

//route middlewares
app.use(stock_routes);
app.use(productManagerRoutes);

const port = process.env.PORT || 8000

app.listen(port ,()=>{
    console.log(`Backend service started on port ${port}`)
})