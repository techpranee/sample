/**
 * notificationRoutes.js
 * @description :: CRUD API routes for notification
 */

const express = require('express');
const router = express.Router();
const notificationController = require('../../../controller/cleanerapp/v1/notificationController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/cleanerapp/api/v1/notification/create').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,notificationController.addNotification);
router.route('/cleanerapp/api/v1/notification/list').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,notificationController.findAllNotification);
router.route('/cleanerapp/api/v1/notification/count').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,notificationController.getNotificationCount);
router.route('/cleanerapp/api/v1/notification/:id').get(auth(PLATFORM.CLEANERAPP),checkRolePermission,notificationController.getNotification);
router.route('/cleanerapp/api/v1/notification/update/:id').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,notificationController.updateNotification);    
router.route('/cleanerapp/api/v1/notification/partial-update/:id').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,notificationController.partialUpdateNotification);
router.route('/cleanerapp/api/v1/notification/softDelete/:id').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,notificationController.softDeleteNotification);
router.route('/cleanerapp/api/v1/notification/softDeleteMany').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,notificationController.softDeleteManyNotification);
router.route('/cleanerapp/api/v1/notification/addBulk').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,notificationController.bulkInsertNotification);
router.route('/cleanerapp/api/v1/notification/updateBulk').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,notificationController.bulkUpdateNotification);
router.route('/cleanerapp/api/v1/notification/delete/:id').delete(auth(PLATFORM.CLEANERAPP),checkRolePermission,notificationController.deleteNotification);
router.route('/cleanerapp/api/v1/notification/deleteMany').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,notificationController.deleteManyNotification);

module.exports = router;
