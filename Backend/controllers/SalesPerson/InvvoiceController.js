const Invoice = require("../../models/SalesPerson/InvoiceModel");

//adding account details
const addInvoiceData = async (req, res) => {

    let newData = new Invoice(req.body);


    //    const { ProductName ,Address , EmailAddress , PhoneNumber ,UserName } = req.body;

    const data = req.body

    try {

        newData.save((err) => {
            if (err) {
                return res.status(400).json({
                    message: err,
                    code: "300"
                });
            }
            return res.status(200).json({
                message: "data added succsesfull",
                code: "200"
            });
        });

    } catch (err) {

        return res.status(400).json({
            messages: err,
            code: "500"
        });

    }
}


//get all acount details
const getAllInvoices = async (req, res) => {
    try {
        const InvoiceData = await Invoice.find();
        return res.status(200).send({
            data: InvoiceData,
            code: "200"
        });

    } catch (err) {

        return res.status(500).send({
            message: err,
            code: "500"
        })

    }
}


//get invoice number
const getInvoiceNumber = async (req,res) => {

    try{

        const { ShopName } = req.body;
        Invoice.find({ "ShopName": ShopName },
    
            (err, obj) => {
    
                if (obj) {
    
                    return res.status(200).json({ code: "200", data: obj })
    
                } else {
                    return res.status(200).json({ code: "201", error: "No Data", data: obj })
                }
            });

    }catch(err){

        return res.status(500).send({
            message: err,
            code: "500"
        })
    }
  

}
 
module.exports = {
    addInvoiceData,
    getAllInvoices,
    getInvoiceNumber
}