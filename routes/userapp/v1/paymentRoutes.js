/**
 * paymentRoutes.js
 * @description :: CRUD API routes for payment
 */

const express = require('express');
const router = express.Router();
const paymentController = require('../../../controller/userapp/v1/paymentController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/userapp/api/v1/payment/create').post(auth(PLATFORM.USERAPP),checkRolePermission,paymentController.addPayment);
router.route('/userapp/api/v1/payment/addBulk').post(auth(PLATFORM.USERAPP),checkRolePermission,paymentController.bulkInsertPayment);
router.route('/userapp/api/v1/payment/list').post(auth(PLATFORM.USERAPP),checkRolePermission,paymentController.findAllPayment);
router.route('/userapp/api/v1/payment/count').post(auth(PLATFORM.USERAPP),checkRolePermission,paymentController.getPaymentCount);
router.route('/userapp/api/v1/payment/:id').get(auth(PLATFORM.USERAPP),checkRolePermission,paymentController.getPayment);
router.route('/userapp/api/v1/payment/update/:id').put(auth(PLATFORM.USERAPP),checkRolePermission,paymentController.updatePayment);    
router.route('/userapp/api/v1/payment/partial-update/:id').put(auth(PLATFORM.USERAPP),checkRolePermission,paymentController.partialUpdatePayment);
router.route('/userapp/api/v1/payment/updateBulk').put(auth(PLATFORM.USERAPP),checkRolePermission,paymentController.bulkUpdatePayment);
router.route('/userapp/api/v1/payment/softDelete/:id').put(auth(PLATFORM.USERAPP),checkRolePermission,paymentController.softDeletePayment);
router.route('/userapp/api/v1/payment/softDeleteMany').put(auth(PLATFORM.USERAPP),checkRolePermission,paymentController.softDeleteManyPayment);
router.route('/userapp/api/v1/payment/delete/:id').delete(auth(PLATFORM.USERAPP),checkRolePermission,paymentController.deletePayment);
router.route('/userapp/api/v1/payment/deleteMany').post(auth(PLATFORM.USERAPP),checkRolePermission,paymentController.deleteManyPayment);

module.exports = router;
