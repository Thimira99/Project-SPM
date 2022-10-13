const Invoice = require("../../models/SalesPerson/InvoiceModel");

//adding account details
const addInvoiceData = async (req, res) => {

    let newData = new Invoice(req.body);


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

//get invoice number and delete
const getInvoiceNumberAndDelete = async (req,res) => {

    try{

        const { InvoiceNumber , ShopName ,AgentNumber } = req.body;
        Invoice.findOne({ "InvoiceNumber": InvoiceNumber ,"ShopName" : ShopName ,"AgentNumber":AgentNumber },
    
            (err, obj) => {

                console.log(obj)
    
                if (obj) {

                    Invoice.findByIdAndDelete(obj._id).exec((err,deletedDistribution)=>{
                        if(err){
                            return res.status(200).json({
                                code:"300",
                                message:"Couldn't delete the distribution something is wrong!",deletedDistribution
                            });
                        }
                        return res.status(200).json({
                            code:"200",
                            success:"Distribution deleted successfully!",deletedDistribution
                        });
                    });
    
                   
    
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



//get invoice by shopName and Agent
const getInvoiceByNameAndAgent = async (req,res) => {

    try{

        const { ShopName, AgentNumber } = req.body;
        Invoice.find({ "ShopName": ShopName ,"AgentNumber": AgentNumber},
    
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
    getInvoiceNumber,
    getInvoiceNumberAndDelete,
    getInvoiceByNameAndAgent
}