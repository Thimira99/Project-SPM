const InvoiceProduct = require("../../models/SalesPerson/InvoicePrduct");

//adding account details
const addInvoiceProductData = async (req, res) => {

    let newData = new InvoiceProduct(req.body);


    //    const { ProductName ,Address , EmailAddress , PhoneNumber ,UserName } = req.body;

    const data = req.body

    try {

        newData.save((err) => {
            if (err) {
                return res.status(200).json({
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

        return res.status(200).json({
            messages: err,
            code: "500"
        });

    }
}


//get all acount details
const getAllInvoiceProductData = async (req, res) => {
    try {
        const InvoiceData = await InvoiceProduct.find();
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


//get invoice by shopName and Agent
const getInvoiceByNameAndAgentAndShopProduct = async (req,res) => {

    try{

        const { ShopName, AgentNumber , InvoiceNumber} = req.body;
        InvoiceProduct.find({ "ShopName": ShopName ,"AgentNumber": AgentNumber,"InvoiceNumber":InvoiceNumber},
    
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
    getAllInvoiceProductData,
    addInvoiceProductData,
    getInvoiceByNameAndAgentAndShopProduct
    
}