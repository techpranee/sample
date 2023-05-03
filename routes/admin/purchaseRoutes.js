/**
 * purchaseRoutes.js
 * @description :: CRUD API routes for purchase
 */

const express = require('express');
const router = express.Router();
const purchaseController = require('../../controller/admin/purchaseController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/purchase/create').post(auth(PLATFORM.ADMIN),checkRolePermission,purchaseController.addPurchase);
router.route('/admin/purchase/list').post(auth(PLATFORM.ADMIN),checkRolePermission,purchaseController.findAllPurchase);
router.route('/admin/purchase/count').post(auth(PLATFORM.ADMIN),checkRolePermission,purchaseController.getPurchaseCount);
router.route('/admin/purchase/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,purchaseController.getPurchase);
router.route('/admin/purchase/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,purchaseController.updatePurchase);    
router.route('/admin/purchase/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,purchaseController.partialUpdatePurchase);
router.route('/admin/purchase/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,purchaseController.softDeletePurchase);
router.route('/admin/purchase/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,purchaseController.softDeleteManyPurchase);
router.route('/admin/purchase/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,purchaseController.bulkInsertPurchase);
router.route('/admin/purchase/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,purchaseController.bulkUpdatePurchase);
router.route('/admin/purchase/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,purchaseController.deletePurchase);
router.route('/admin/purchase/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,purchaseController.deleteManyPurchase);

module.exports = router;
