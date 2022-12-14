
// import json web token library
const jwt = require('jsonwebtoken');

// import permission class
const permission = require('../service/accessService');


// validate token
const getTokenFromHeader = (req) => {
    console.log(req.headers);
    if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Token'
    ) {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
};

// validate the API request body according to the schema defined
module.exports.validateBody = function (schema) {
    return (req, res, next) => {
        // validate the API request body according to the schema defined
        const result = schema.validate(req.body);

        if (result.error) {
            return res.status(422).json({
                status: false,
                msg: result.error.details[0].message,
            });
        }
        next();
    };
};

// validate the API request header
module.exports.validateHeader = (grantedArray) => {
    return (req, res, next) => {
        return jwt.verify(getTokenFromHeader(req), 'secret', async (err, decoded) => {
            if (err) {
                return res.status(422).json({
                    status: false,
                    msg: 'Invalid Token',
                    err: err
                });
            }
            try {
                await permission.validity(decoded.accountType, grantedArray);
                next();
            } catch (error) {
                return res.status(422).json({
                    status: false,
                    msg: error,
                });
            }
        });
    };
};

