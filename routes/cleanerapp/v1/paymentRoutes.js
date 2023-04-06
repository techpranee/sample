/**
 * paymentRoutes.js
 * @description :: CRUD API routes for payment
 */

const express = require('express');
const router = express.Router();
const paymentController = require('../../../controller/cleanerapp/v1/paymentController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/cleanerapp/api/v1/payment/create').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,paymentController.addPayment);
router.route('/cleanerapp/api/v1/payment/addBulk').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,paymentController.bulkInsertPayment);
router.route('/cleanerapp/api/v1/payment/list').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,paymentController.findAllPayment);
router.route('/cleanerapp/api/v1/payment/count').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,paymentController.getPaymentCount);
router.route('/cleanerapp/api/v1/payment/:id').get(auth(PLATFORM.CLEANERAPP),checkRolePermission,paymentController.getPayment);
router.route('/cleanerapp/api/v1/payment/update/:id').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,paymentController.updatePayment);    
router.route('/cleanerapp/api/v1/payment/partial-update/:id').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,paymentController.partialUpdatePayment);
router.route('/cleanerapp/api/v1/payment/updateBulk').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,paymentController.bulkUpdatePayment);
router.route('/cleanerapp/api/v1/payment/softDelete/:id').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,paymentController.softDeletePayment);
router.route('/cleanerapp/api/v1/payment/softDeleteMany').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,paymentController.softDeleteManyPayment);
router.route('/cleanerapp/api/v1/payment/delete/:id').delete(auth(PLATFORM.CLEANERAPP),checkRolePermission,paymentController.deletePayment);
router.route('/cleanerapp/api/v1/payment/deleteMany').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,paymentController.deleteManyPayment);

module.exports = router;
