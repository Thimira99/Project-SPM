const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const stock_routes = require("./routes/stockRoutes")

const distribution_routes = require("./routes/distributionRoutes")
const notes_routes = require("./notes/notes.router")


const productManagerRoutes = require("./routes/productManagerRoutes")

const user_router = require("./routes/userRoutes/userRoutes");


const sales_rep_routes = require("./routes/salesRepRoutes")
 



const app = express()
dotenv.config()
require('./DB/DB.js');


//app middlewares
app.use(cors())
app.use(express.json())

//route middlewares
app.use(stock_routes);

app.use(distribution_routes);
app.use(notes_routes);


app.use(productManagerRoutes);

app.use(user_router);


app.use("/api",sales_rep_routes);
 




const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Backend service started on port ${port}`)
})