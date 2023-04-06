/**
 * subscriptionRoutes.js
 * @description :: CRUD API routes for subscription
 */

const express = require('express');
const router = express.Router();
const subscriptionController = require('../../../controller/cleanerapp/v1/subscriptionController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/cleanerapp/api/v1/subscription/create').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,subscriptionController.addSubscription);
router.route('/cleanerapp/api/v1/subscription/addBulk').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,subscriptionController.bulkInsertSubscription);
router.route('/cleanerapp/api/v1/subscription/list').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,subscriptionController.findAllSubscription);
router.route('/cleanerapp/api/v1/subscription/count').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,subscriptionController.getSubscriptionCount);
router.route('/cleanerapp/api/v1/subscription/:id').get(auth(PLATFORM.CLEANERAPP),checkRolePermission,subscriptionController.getSubscription);
router.route('/cleanerapp/api/v1/subscription/update/:id').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,subscriptionController.updateSubscription);    
router.route('/cleanerapp/api/v1/subscription/partial-update/:id').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,subscriptionController.partialUpdateSubscription);
router.route('/cleanerapp/api/v1/subscription/updateBulk').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,subscriptionController.bulkUpdateSubscription);
router.route('/cleanerapp/api/v1/subscription/softDelete/:id').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,subscriptionController.softDeleteSubscription);
router.route('/cleanerapp/api/v1/subscription/softDeleteMany').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,subscriptionController.softDeleteManySubscription);
router.route('/cleanerapp/api/v1/subscription/delete/:id').delete(auth(PLATFORM.CLEANERAPP),checkRolePermission,subscriptionController.deleteSubscription);
router.route('/cleanerapp/api/v1/subscription/deleteMany').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,subscriptionController.deleteManySubscription);

module.exports = router;
