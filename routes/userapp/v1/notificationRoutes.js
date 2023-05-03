/**
 * notificationRoutes.js
 * @description :: CRUD API routes for notification
 */

const express = require('express');
const router = express.Router();
const notificationController = require('../../../controller/userapp/v1/notificationController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/userapp/api/v1/notification/create').post(auth(PLATFORM.USERAPP),checkRolePermission,notificationController.addNotification);
router.route('/userapp/api/v1/notification/list').post(auth(PLATFORM.USERAPP),checkRolePermission,notificationController.findAllNotification);
router.route('/userapp/api/v1/notification/count').post(auth(PLATFORM.USERAPP),checkRolePermission,notificationController.getNotificationCount);
router.route('/userapp/api/v1/notification/:id').get(auth(PLATFORM.USERAPP),checkRolePermission,notificationController.getNotification);
router.route('/userapp/api/v1/notification/update/:id').put(auth(PLATFORM.USERAPP),checkRolePermission,notificationController.updateNotification);    
router.route('/userapp/api/v1/notification/partial-update/:id').put(auth(PLATFORM.USERAPP),checkRolePermission,notificationController.partialUpdateNotification);
router.route('/userapp/api/v1/notification/softDelete/:id').put(auth(PLATFORM.USERAPP),checkRolePermission,notificationController.softDeleteNotification);
router.route('/userapp/api/v1/notification/softDeleteMany').put(auth(PLATFORM.USERAPP),checkRolePermission,notificationController.softDeleteManyNotification);
router.route('/userapp/api/v1/notification/addBulk').post(auth(PLATFORM.USERAPP),checkRolePermission,notificationController.bulkInsertNotification);
router.route('/userapp/api/v1/notification/updateBulk').put(auth(PLATFORM.USERAPP),checkRolePermission,notificationController.bulkUpdateNotification);
router.route('/userapp/api/v1/notification/delete/:id').delete(auth(PLATFORM.USERAPP),checkRolePermission,notificationController.deleteNotification);
router.route('/userapp/api/v1/notification/deleteMany').post(auth(PLATFORM.USERAPP),checkRolePermission,notificationController.deleteManyNotification);

module.exports = router;
