/**
 * notificationRoutes.js
 * @description :: CRUD API routes for notification
 */

const express = require('express');
const router = express.Router();
const notificationController = require('../../../controller/dashboard/v1/notificationController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/dashboard/api/v1/notification/create').post(auth(PLATFORM.DASHBOARD),checkRolePermission,notificationController.addNotification);
router.route('/dashboard/api/v1/notification/list').post(auth(PLATFORM.DASHBOARD),checkRolePermission,notificationController.findAllNotification);
router.route('/dashboard/api/v1/notification/count').post(auth(PLATFORM.DASHBOARD),checkRolePermission,notificationController.getNotificationCount);
router.route('/dashboard/api/v1/notification/:id').get(auth(PLATFORM.DASHBOARD),checkRolePermission,notificationController.getNotification);
router.route('/dashboard/api/v1/notification/update/:id').put(auth(PLATFORM.DASHBOARD),checkRolePermission,notificationController.updateNotification);    
router.route('/dashboard/api/v1/notification/partial-update/:id').put(auth(PLATFORM.DASHBOARD),checkRolePermission,notificationController.partialUpdateNotification);
router.route('/dashboard/api/v1/notification/softDelete/:id').put(auth(PLATFORM.DASHBOARD),checkRolePermission,notificationController.softDeleteNotification);
router.route('/dashboard/api/v1/notification/softDeleteMany').put(auth(PLATFORM.DASHBOARD),checkRolePermission,notificationController.softDeleteManyNotification);
router.route('/dashboard/api/v1/notification/addBulk').post(auth(PLATFORM.DASHBOARD),checkRolePermission,notificationController.bulkInsertNotification);
router.route('/dashboard/api/v1/notification/updateBulk').put(auth(PLATFORM.DASHBOARD),checkRolePermission,notificationController.bulkUpdateNotification);
router.route('/dashboard/api/v1/notification/delete/:id').delete(auth(PLATFORM.DASHBOARD),checkRolePermission,notificationController.deleteNotification);
router.route('/dashboard/api/v1/notification/deleteMany').post(auth(PLATFORM.DASHBOARD),checkRolePermission,notificationController.deleteManyNotification);

module.exports = router;
