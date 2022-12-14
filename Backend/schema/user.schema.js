// import validator class
const joi = require('joi');
// import permission list
const permissionList = require('../config/permissionConfig').userRoles;

// create object schema
module.exports.create = joi.object().keys({
	firstName: joi.string().required(),
	lastName: joi.string().required(),
	dateOfBirth: joi.string(),
	email: joi.string().required(),
	mobile: joi.string(),
	accountType: joi
		.string()
		.valid(
			permissionList.admin,
			permissionList.rawMaterialManager,
			permissionList.productionManager,
			permissionList.stockManager,
			permissionList.stockManager,
			permissionList.salesRep
		),
});

// update object schema
module.exports.put = joi.object().keys({
	firstName: joi.string(),
	lastName: joi.string(),
	dateOfBirth: joi.string(),
	password: joi.string(),
	email: joi.string(),
	mobile: joi.string(),
	status: joi.boolean().required(),
	accountType: joi
		.string()
		.valid(
			permissionList.admin,
			permissionList.rawMaterialManager,
			permissionList.productionManager,
			permissionList.stockManager,
			permissionList.stockManager,
			permissionList.salesRep
		),
});

// login
module.exports.login = joi.object().keys({
	password: joi.string().required(),
	email: joi.string().required(),
});
