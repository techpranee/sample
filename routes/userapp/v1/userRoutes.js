/**
 * userRoutes.js
 * @description :: CRUD API routes for user
 */

const express = require('express');
const router = express.Router();
const userController = require('../../../controller/userapp/v1/userController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/userapp/api/v1/user/me').get(auth(PLATFORM.USERAPP),userController.getLoggedInUserInfo);
router.route('/userapp/api/v1/user/create').post(auth(PLATFORM.USERAPP),checkRolePermission,userController.addUser);
router.route('/userapp/api/v1/user/addBulk').post(auth(PLATFORM.USERAPP),checkRolePermission,userController.bulkInsertUser);
router.route('/userapp/api/v1/user/list').post(auth(PLATFORM.USERAPP),checkRolePermission,userController.findAllUser);
router.route('/userapp/api/v1/user/count').post(auth(PLATFORM.USERAPP),checkRolePermission,userController.getUserCount);
router.route('/userapp/api/v1/user/:id').get(auth(PLATFORM.USERAPP),checkRolePermission,userController.getUser);
router.route('/userapp/api/v1/user/update/:id').put(userController.updateUser);    
router.route('/userapp/api/v1/user/partial-update/:id').put(userController.partialUpdateUser);
router.route('/userapp/api/v1/user/updateBulk').put(userController.bulkUpdateUser);
router.route('/userapp/api/v1/user/softDelete/:id').put(userController.softDeleteUser);
router.route('/userapp/api/v1/user/softDeleteMany').put(userController.softDeleteManyUser);
router.route('/userapp/api/v1/user/delete/:id').delete(userController.deleteUser);
router.route('/userapp/api/v1/user/deleteMany').post(userController.deleteManyUser);
router.route('/userapp/api/v1/user/change-password').put(auth(PLATFORM.USERAPP),userController.changePassword);
router.route('/userapp/api/v1/user/update-profile').put(auth(PLATFORM.USERAPP),userController.updateProfile);

module.exports = router;
