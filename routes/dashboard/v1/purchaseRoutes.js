/**
 * purchaseRoutes.js
 * @description :: CRUD API routes for purchase
 */

const express = require('express');
const router = express.Router();
const purchaseController = require('../../../controller/dashboard/v1/purchaseController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/dashboard/api/v1/purchase/create').post(auth(PLATFORM.DASHBOARD),checkRolePermission,purchaseController.addPurchase);
router.route('/dashboard/api/v1/purchase/list').post(auth(PLATFORM.DASHBOARD),checkRolePermission,purchaseController.findAllPurchase);
router.route('/dashboard/api/v1/purchase/count').post(auth(PLATFORM.DASHBOARD),checkRolePermission,purchaseController.getPurchaseCount);
router.route('/dashboard/api/v1/purchase/:id').get(auth(PLATFORM.DASHBOARD),checkRolePermission,purchaseController.getPurchase);
router.route('/dashboard/api/v1/purchase/update/:id').put(auth(PLATFORM.DASHBOARD),checkRolePermission,purchaseController.updatePurchase);    
router.route('/dashboard/api/v1/purchase/partial-update/:id').put(auth(PLATFORM.DASHBOARD),checkRolePermission,purchaseController.partialUpdatePurchase);
router.route('/dashboard/api/v1/purchase/softDelete/:id').put(auth(PLATFORM.DASHBOARD),checkRolePermission,purchaseController.softDeletePurchase);
router.route('/dashboard/api/v1/purchase/softDeleteMany').put(auth(PLATFORM.DASHBOARD),checkRolePermission,purchaseController.softDeleteManyPurchase);
router.route('/dashboard/api/v1/purchase/addBulk').post(auth(PLATFORM.DASHBOARD),checkRolePermission,purchaseController.bulkInsertPurchase);
router.route('/dashboard/api/v1/purchase/updateBulk').put(auth(PLATFORM.DASHBOARD),checkRolePermission,purchaseController.bulkUpdatePurchase);
router.route('/dashboard/api/v1/purchase/delete/:id').delete(auth(PLATFORM.DASHBOARD),checkRolePermission,purchaseController.deletePurchase);
router.route('/dashboard/api/v1/purchase/deleteMany').post(auth(PLATFORM.DASHBOARD),checkRolePermission,purchaseController.deleteManyPurchase);

module.exports = router;
