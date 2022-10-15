const pdfTemplate = require("../../Documents/index");
const pdf = require('html-pdf');
const InvoiceProduct = require("../../models/SalesPerson/InvoicePrduct");
const Invoice = require("../../models/SalesPerson/InvoiceModel");
const shop = require("../../models/SalesPerson/shopModel");

const postDetails = async (req, res) => {



    pdf.create(pdfTemplate(req.body), {}).toFile('result2.pdf', (err) => {
        if (err) {
            res.send(Promise.reject());
        }
        res.send(Promise.resolve());
    })

   
}

const getDetails = async (req, res) => {

    res.sendFile(`/SPM_PROJ_UAT/Project-SPM/Backend/result2.pdf`)
}

module.exports = {
    postDetails,
    getDetails
}