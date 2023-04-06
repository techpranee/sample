/**
 * subscriptionRoutes.js
 * @description :: CRUD API routes for subscription
 */

const express = require('express');
const router = express.Router();
const subscriptionController = require('../../controller/admin/subscriptionController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/subscription/create').post(auth(PLATFORM.ADMIN),checkRolePermission,subscriptionController.addSubscription);
router.route('/admin/subscription/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,subscriptionController.bulkInsertSubscription);
router.route('/admin/subscription/list').post(auth(PLATFORM.ADMIN),checkRolePermission,subscriptionController.findAllSubscription);
router.route('/admin/subscription/count').post(auth(PLATFORM.ADMIN),checkRolePermission,subscriptionController.getSubscriptionCount);
router.route('/admin/subscription/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,subscriptionController.getSubscription);
router.route('/admin/subscription/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,subscriptionController.updateSubscription);    
router.route('/admin/subscription/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,subscriptionController.partialUpdateSubscription);
router.route('/admin/subscription/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,subscriptionController.bulkUpdateSubscription);
router.route('/admin/subscription/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,subscriptionController.softDeleteSubscription);
router.route('/admin/subscription/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,subscriptionController.softDeleteManySubscription);
router.route('/admin/subscription/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,subscriptionController.deleteSubscription);
router.route('/admin/subscription/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,subscriptionController.deleteManySubscription);

module.exports = router;
