/**
 * userRoutes.js
 * @description :: CRUD API routes for user
 */

const express = require('express');
const router = express.Router();
const userController = require('../../controller/admin/userController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/user/me').get(auth(PLATFORM.ADMIN),userController.getLoggedInUserInfo);
router.route('/admin/user/create').post(userController.addUser);
router.route('/admin/user/addBulk').post(userController.bulkInsertUser);
router.route('/admin/user/list').post(auth(PLATFORM.ADMIN),checkRolePermission,userController.findAllUser);
router.route('/admin/user/count').post(auth(PLATFORM.ADMIN),checkRolePermission,userController.getUserCount);
router.route('/admin/user/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,userController.getUser);
router.route('/admin/user/update/:id').put(userController.updateUser);    
router.route('/admin/user/partial-update/:id').put(userController.partialUpdateUser);
router.route('/admin/user/updateBulk').put(userController.bulkUpdateUser);
router.route('/admin/user/softDelete/:id').put(userController.softDeleteUser);
router.route('/admin/user/softDeleteMany').put(userController.softDeleteManyUser);
router.route('/admin/user/delete/:id').delete(userController.deleteUser);
router.route('/admin/user/deleteMany').post(userController.deleteManyUser);
router.route('/admin/user/change-password').put(auth(PLATFORM.ADMIN),userController.changePassword);
router.route('/admin/user/update-profile').put(auth(PLATFORM.ADMIN),userController.updateProfile);

module.exports = router;
