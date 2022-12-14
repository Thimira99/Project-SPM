const shop = require("../../models/SalesPerson/shopModel");
var json = require('json');

//adding account details
const addAcountDetails = async (req, res) => {

    let newData = new shop(req.body);


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
const getallAccountDetails = async (req, res) => {
    try {
        const ShopData = await shop.find();
        return res.status(200).send({
            data: ShopData,
            code: "200"
        });

    } catch (err) {

        return res.status(500).send({
            message: err,
            code: "500"
        })

    }
}

//get all acount details by search
const getDataBySearch = async (req, res) => {
    const { sh_Name, sh_RegistrationNumber, sh_Region } = req.body;


    console.log(sh_Region)
    shop.find({ sh_Region: sh_Region },

        (err, obj) => {

            if (obj) {

                if (sh_Name || sh_RegistrationNumber) {

                    let data = [];

                    data = JSON.parse(JSON.stringify(obj))

                    let resData = [];

                    data.forEach((ob) => {
                        if (sh_Name == ob.sh_Name || sh_RegistrationNumber == ob.sh_RegistrationNumber) {
                            console.log(ob)
                            resData.push(ob);

                        }

                    })

                    return res.status(200).json({ code: "200", message: "succesfull", data: resData })

                } else {

                    return res.status(200).json({ code: "200", message: "succesfull", data: obj })
                }



            } else {
                return res.status(200).json({ code: "201", error: "No Data", data: obj })
            }
        });
}




//get a specific supplier by id
const getShopById = async (req, res) => {
    
    let shopId = req.params.id;
    shop.findById(shopId, (err, supplier) => {
        if (err) {
            return res.status(400).json({ code:"201",success: false, err });
        } else {
            return res.status(200).json({
                code:"200",
                success: true,
                supplier
            });
        }


    });

}

// /*Update shop */

// const updateShop = async (req, res) => {
//     shop.findByIdAndUpdate(
//         req.params.id,
//         {
//             $set: req.body
//         },

//     ).then(() => {
//         res.status(200).send({ status: "200", statusmsg: "user updated" });
//     }).catch((err) => {
//         console.error(err);
//         res.status(500).send({ status: "500", statusmsg: "error with updating data" });

//     })
// }




module.exports = {
    addAcountDetails,
    getallAccountDetails,
    getDataBySearch,
    getShopById

}