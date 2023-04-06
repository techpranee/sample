/**
 * userRoutes.js
 * @description :: CRUD API routes for user
 */

const express = require('express');
const router = express.Router();
const userController = require('../../../controller/cleanerapp/v1/userController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/cleanerapp/api/v1/user/me').get(auth(PLATFORM.CLEANERAPP),userController.getLoggedInUserInfo);
router.route('/cleanerapp/api/v1/user/create').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,userController.addUser);
router.route('/cleanerapp/api/v1/user/addBulk').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,userController.bulkInsertUser);
router.route('/cleanerapp/api/v1/user/list').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,userController.findAllUser);
router.route('/cleanerapp/api/v1/user/count').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,userController.getUserCount);
router.route('/cleanerapp/api/v1/user/:id').get(auth(PLATFORM.CLEANERAPP),checkRolePermission,userController.getUser);
router.route('/cleanerapp/api/v1/user/update/:id').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,userController.updateUser);    
router.route('/cleanerapp/api/v1/user/partial-update/:id').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,userController.partialUpdateUser);
router.route('/cleanerapp/api/v1/user/updateBulk').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,userController.bulkUpdateUser);
router.route('/cleanerapp/api/v1/user/softDelete/:id').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,userController.softDeleteUser);
router.route('/cleanerapp/api/v1/user/softDeleteMany').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,userController.softDeleteManyUser);
router.route('/cleanerapp/api/v1/user/delete/:id').delete(auth(PLATFORM.CLEANERAPP),checkRolePermission,userController.deleteUser);
router.route('/cleanerapp/api/v1/user/deleteMany').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,userController.deleteManyUser);
router.route('/cleanerapp/api/v1/user/change-password').put(auth(PLATFORM.CLEANERAPP),userController.changePassword);
router.route('/cleanerapp/api/v1/user/update-profile').put(auth(PLATFORM.CLEANERAPP),userController.updateProfile);

module.exports = router;
