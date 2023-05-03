/**
 * purchaseRoutes.js
 * @description :: CRUD API routes for purchase
 */

const express = require('express');
const router = express.Router();
const purchaseController = require('../../../controller/cleanerapp/v1/purchaseController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/cleanerapp/api/v1/purchase/create').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,purchaseController.addPurchase);
router.route('/cleanerapp/api/v1/purchase/list').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,purchaseController.findAllPurchase);
router.route('/cleanerapp/api/v1/purchase/count').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,purchaseController.getPurchaseCount);
router.route('/cleanerapp/api/v1/purchase/:id').get(auth(PLATFORM.CLEANERAPP),checkRolePermission,purchaseController.getPurchase);
router.route('/cleanerapp/api/v1/purchase/update/:id').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,purchaseController.updatePurchase);    
router.route('/cleanerapp/api/v1/purchase/partial-update/:id').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,purchaseController.partialUpdatePurchase);
router.route('/cleanerapp/api/v1/purchase/softDelete/:id').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,purchaseController.softDeletePurchase);
router.route('/cleanerapp/api/v1/purchase/softDeleteMany').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,purchaseController.softDeleteManyPurchase);
router.route('/cleanerapp/api/v1/purchase/addBulk').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,purchaseController.bulkInsertPurchase);
router.route('/cleanerapp/api/v1/purchase/updateBulk').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,purchaseController.bulkUpdatePurchase);
router.route('/cleanerapp/api/v1/purchase/delete/:id').delete(auth(PLATFORM.CLEANERAPP),checkRolePermission,purchaseController.deletePurchase);
router.route('/cleanerapp/api/v1/purchase/deleteMany').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,purchaseController.deleteManyPurchase);

module.exports = router;
