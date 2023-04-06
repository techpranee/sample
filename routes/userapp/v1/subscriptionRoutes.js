/**
 * subscriptionRoutes.js
 * @description :: CRUD API routes for subscription
 */

const express = require('express');
const router = express.Router();
const subscriptionController = require('../../../controller/userapp/v1/subscriptionController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/userapp/api/v1/subscription/create').post(auth(PLATFORM.USERAPP),checkRolePermission,subscriptionController.addSubscription);
router.route('/userapp/api/v1/subscription/addBulk').post(auth(PLATFORM.USERAPP),checkRolePermission,subscriptionController.bulkInsertSubscription);
router.route('/userapp/api/v1/subscription/list').post(auth(PLATFORM.USERAPP),checkRolePermission,subscriptionController.findAllSubscription);
router.route('/userapp/api/v1/subscription/count').post(auth(PLATFORM.USERAPP),checkRolePermission,subscriptionController.getSubscriptionCount);
router.route('/userapp/api/v1/subscription/:id').get(auth(PLATFORM.USERAPP),checkRolePermission,subscriptionController.getSubscription);
router.route('/userapp/api/v1/subscription/update/:id').put(auth(PLATFORM.USERAPP),checkRolePermission,subscriptionController.updateSubscription);    
router.route('/userapp/api/v1/subscription/partial-update/:id').put(auth(PLATFORM.USERAPP),checkRolePermission,subscriptionController.partialUpdateSubscription);
router.route('/userapp/api/v1/subscription/updateBulk').put(auth(PLATFORM.USERAPP),checkRolePermission,subscriptionController.bulkUpdateSubscription);
router.route('/userapp/api/v1/subscription/softDelete/:id').put(auth(PLATFORM.USERAPP),checkRolePermission,subscriptionController.softDeleteSubscription);
router.route('/userapp/api/v1/subscription/softDeleteMany').put(auth(PLATFORM.USERAPP),checkRolePermission,subscriptionController.softDeleteManySubscription);
router.route('/userapp/api/v1/subscription/delete/:id').delete(auth(PLATFORM.USERAPP),checkRolePermission,subscriptionController.deleteSubscription);
router.route('/userapp/api/v1/subscription/deleteMany').post(auth(PLATFORM.USERAPP),checkRolePermission,subscriptionController.deleteManySubscription);

module.exports = router;
