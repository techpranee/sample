/**
 * purchaseRoutes.js
 * @description :: CRUD API routes for purchase
 */

const express = require('express');
const router = express.Router();
const purchaseController = require('../../../controller/userapp/v1/purchaseController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/userapp/api/v1/purchase/create').post(auth(PLATFORM.USERAPP),checkRolePermission,purchaseController.addPurchase);
router.route('/userapp/api/v1/purchase/list').post(auth(PLATFORM.USERAPP),checkRolePermission,purchaseController.findAllPurchase);
router.route('/userapp/api/v1/purchase/count').post(auth(PLATFORM.USERAPP),checkRolePermission,purchaseController.getPurchaseCount);
router.route('/userapp/api/v1/purchase/:id').get(auth(PLATFORM.USERAPP),checkRolePermission,purchaseController.getPurchase);
router.route('/userapp/api/v1/purchase/update/:id').put(auth(PLATFORM.USERAPP),checkRolePermission,purchaseController.updatePurchase);    
router.route('/userapp/api/v1/purchase/partial-update/:id').put(auth(PLATFORM.USERAPP),checkRolePermission,purchaseController.partialUpdatePurchase);
router.route('/userapp/api/v1/purchase/softDelete/:id').put(auth(PLATFORM.USERAPP),checkRolePermission,purchaseController.softDeletePurchase);
router.route('/userapp/api/v1/purchase/softDeleteMany').put(auth(PLATFORM.USERAPP),checkRolePermission,purchaseController.softDeleteManyPurchase);
router.route('/userapp/api/v1/purchase/addBulk').post(auth(PLATFORM.USERAPP),checkRolePermission,purchaseController.bulkInsertPurchase);
router.route('/userapp/api/v1/purchase/updateBulk').put(auth(PLATFORM.USERAPP),checkRolePermission,purchaseController.bulkUpdatePurchase);
router.route('/userapp/api/v1/purchase/delete/:id').delete(auth(PLATFORM.USERAPP),checkRolePermission,purchaseController.deletePurchase);
router.route('/userapp/api/v1/purchase/deleteMany').post(auth(PLATFORM.USERAPP),checkRolePermission,purchaseController.deleteManyPurchase);

module.exports = router;
