/**
 * paymentRoutes.js
 * @description :: CRUD API routes for payment
 */

const express = require('express');
const router = express.Router();
const paymentController = require('../../../controller/dashboard/v1/paymentController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/dashboard/api/v1/payment/create').post(paymentController.addPayment);
router.route('/dashboard/api/v1/payment/addBulk').post(paymentController.bulkInsertPayment);
router.route('/dashboard/api/v1/payment/list').post(paymentController.findAllPayment);
router.route('/dashboard/api/v1/payment/count').post(paymentController.getPaymentCount);
router.route('/dashboard/api/v1/payment/:id').get(paymentController.getPayment);
router.route('/dashboard/api/v1/payment/update/:id').put(paymentController.updatePayment);    
router.route('/dashboard/api/v1/payment/partial-update/:id').put(paymentController.partialUpdatePayment);
router.route('/dashboard/api/v1/payment/updateBulk').put(paymentController.bulkUpdatePayment);
router.route('/dashboard/api/v1/payment/softDelete/:id').put(paymentController.softDeletePayment);
router.route('/dashboard/api/v1/payment/softDeleteMany').put(paymentController.softDeleteManyPayment);
router.route('/dashboard/api/v1/payment/delete/:id').delete(paymentController.deletePayment);
router.route('/dashboard/api/v1/payment/deleteMany').post(paymentController.deleteManyPayment);

module.exports = router;
