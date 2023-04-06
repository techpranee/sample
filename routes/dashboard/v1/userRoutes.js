/**
 * userRoutes.js
 * @description :: CRUD API routes for user
 */

const express = require('express');
const router = express.Router();
const userController = require('../../../controller/dashboard/v1/userController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/dashboard/api/v1/user/me').get(auth(PLATFORM.DASHBOARD),userController.getLoggedInUserInfo);
router.route('/dashboard/api/v1/user/create').post(userController.addUser);
router.route('/dashboard/api/v1/user/addBulk').post(userController.bulkInsertUser);
router.route('/dashboard/api/v1/user/list').post(userController.findAllUser);
router.route('/dashboard/api/v1/user/count').post(userController.getUserCount);
router.route('/dashboard/api/v1/user/:id').get(userController.getUser);
router.route('/dashboard/api/v1/user/update/:id').put(userController.updateUser);    
router.route('/dashboard/api/v1/user/partial-update/:id').put(userController.partialUpdateUser);
router.route('/dashboard/api/v1/user/updateBulk').put(userController.bulkUpdateUser);
router.route('/dashboard/api/v1/user/softDelete/:id').put(userController.softDeleteUser);
router.route('/dashboard/api/v1/user/softDeleteMany').put(userController.softDeleteManyUser);
router.route('/dashboard/api/v1/user/delete/:id').delete(userController.deleteUser);
router.route('/dashboard/api/v1/user/deleteMany').post(userController.deleteManyUser);
router.route('/dashboard/api/v1/user/change-password').put(auth(PLATFORM.DASHBOARD),userController.changePassword);
router.route('/dashboard/api/v1/user/update-profile').put(auth(PLATFORM.DASHBOARD),userController.updateProfile);

module.exports = router;
