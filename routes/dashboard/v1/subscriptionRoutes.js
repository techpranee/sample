/**
 * subscriptionRoutes.js
 * @description :: CRUD API routes for subscription
 */

const express = require('express');
const router = express.Router();
const subscriptionController = require('../../../controller/dashboard/v1/subscriptionController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/dashboard/api/v1/subscription/create').post(subscriptionController.addSubscription);
router.route('/dashboard/api/v1/subscription/addBulk').post(subscriptionController.bulkInsertSubscription);
router.route('/dashboard/api/v1/subscription/list').post(subscriptionController.findAllSubscription);
router.route('/dashboard/api/v1/subscription/count').post(subscriptionController.getSubscriptionCount);
router.route('/dashboard/api/v1/subscription/:id').get(subscriptionController.getSubscription);
router.route('/dashboard/api/v1/subscription/update/:id').put(subscriptionController.updateSubscription);    
router.route('/dashboard/api/v1/subscription/partial-update/:id').put(subscriptionController.partialUpdateSubscription);
router.route('/dashboard/api/v1/subscription/updateBulk').put(subscriptionController.bulkUpdateSubscription);
router.route('/dashboard/api/v1/subscription/softDelete/:id').put(subscriptionController.softDeleteSubscription);
router.route('/dashboard/api/v1/subscription/softDeleteMany').put(subscriptionController.softDeleteManySubscription);
router.route('/dashboard/api/v1/subscription/delete/:id').delete(subscriptionController.deleteSubscription);
router.route('/dashboard/api/v1/subscription/deleteMany').post(subscriptionController.deleteManySubscription);

module.exports = router;
