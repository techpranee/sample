/**
 * paymentRoutes.js
 * @description :: CRUD API routes for payment
 */

const express = require('express');
const router = express.Router();
const paymentController = require('../../controller/admin/paymentController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/payment/create').post(auth(PLATFORM.ADMIN),checkRolePermission,paymentController.addPayment);
router.route('/admin/payment/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,paymentController.bulkInsertPayment);
router.route('/admin/payment/list').post(auth(PLATFORM.ADMIN),checkRolePermission,paymentController.findAllPayment);
router.route('/admin/payment/count').post(auth(PLATFORM.ADMIN),checkRolePermission,paymentController.getPaymentCount);
router.route('/admin/payment/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,paymentController.getPayment);
router.route('/admin/payment/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,paymentController.updatePayment);    
router.route('/admin/payment/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,paymentController.partialUpdatePayment);
router.route('/admin/payment/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,paymentController.bulkUpdatePayment);
router.route('/admin/payment/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,paymentController.softDeletePayment);
router.route('/admin/payment/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,paymentController.softDeleteManyPayment);
router.route('/admin/payment/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,paymentController.deletePayment);
router.route('/admin/payment/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,paymentController.deleteManyPayment);

module.exports = router;
