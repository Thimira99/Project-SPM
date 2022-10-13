// import permission list
const { admin } = require('../config/permissionConfig').userRoles;

module.exports.permission_list = {
	users_get_all: {
		path: '/get',
		granted: [admin],
	},
	users_get_by_id: {
		path: '/getUserById/:id',
	},
	users_create: {
		path: '/create',
		granted: [admin],
	},
	users_login_email: {
		path: '/login',
	},
	users_update: {
		path: '/:id',
	},
	emp_update: {
		path: '/updateUser/:id',
	},
	users_remove: {
		path: '/deleteUser/:id',
	},
};
