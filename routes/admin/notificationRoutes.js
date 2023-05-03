/**
 * notificationRoutes.js
 * @description :: CRUD API routes for notification
 */

const express = require('express');
const router = express.Router();
const notificationController = require('../../controller/admin/notificationController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/notification/create').post(auth(PLATFORM.ADMIN),checkRolePermission,notificationController.addNotification);
router.route('/admin/notification/list').post(auth(PLATFORM.ADMIN),checkRolePermission,notificationController.findAllNotification);
router.route('/admin/notification/count').post(auth(PLATFORM.ADMIN),checkRolePermission,notificationController.getNotificationCount);
router.route('/admin/notification/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,notificationController.getNotification);
router.route('/admin/notification/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,notificationController.updateNotification);    
router.route('/admin/notification/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,notificationController.partialUpdateNotification);
router.route('/admin/notification/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,notificationController.softDeleteNotification);
router.route('/admin/notification/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,notificationController.softDeleteManyNotification);
router.route('/admin/notification/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,notificationController.bulkInsertNotification);
router.route('/admin/notification/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,notificationController.bulkUpdateNotification);
router.route('/admin/notification/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,notificationController.deleteNotification);
router.route('/admin/notification/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,notificationController.deleteManyNotification);

module.exports = router;
