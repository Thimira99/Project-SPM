// import permission list
const { admin } = require('../config/permissionConfig').userRoles;

module.exports.permission_list = {
    users_get_all: {
        path: '/get',
        granted: [admin],
    },
    users_get_by_id: {
        path: '/:id',
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
    users_remove: {
        path: '/:id',
        granted: [admin],
    },
};
