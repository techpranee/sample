/**
 * walletRoutes.js
 * @description :: CRUD API routes for wallet
 */

const express = require('express');
const router = express.Router();
const walletController = require('../../../controller/dashboard/v1/walletController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/dashboard/api/v1/wallet/create').post(auth(PLATFORM.DASHBOARD),checkRolePermission,walletController.addWallet);
router.route('/dashboard/api/v1/wallet/list').post(auth(PLATFORM.DASHBOARD),checkRolePermission,walletController.findAllWallet);
router.route('/dashboard/api/v1/wallet/count').post(auth(PLATFORM.DASHBOARD),checkRolePermission,walletController.getWalletCount);
router.route('/dashboard/api/v1/wallet/:id').get(auth(PLATFORM.DASHBOARD),checkRolePermission,walletController.getWallet);
router.route('/dashboard/api/v1/wallet/update/:id').put(auth(PLATFORM.DASHBOARD),checkRolePermission,walletController.updateWallet);    
router.route('/dashboard/api/v1/wallet/partial-update/:id').put(auth(PLATFORM.DASHBOARD),checkRolePermission,walletController.partialUpdateWallet);
router.route('/dashboard/api/v1/wallet/softDelete/:id').put(auth(PLATFORM.DASHBOARD),checkRolePermission,walletController.softDeleteWallet);
router.route('/dashboard/api/v1/wallet/softDeleteMany').put(auth(PLATFORM.DASHBOARD),checkRolePermission,walletController.softDeleteManyWallet);
router.route('/dashboard/api/v1/wallet/addBulk').post(auth(PLATFORM.DASHBOARD),checkRolePermission,walletController.bulkInsertWallet);
router.route('/dashboard/api/v1/wallet/updateBulk').put(auth(PLATFORM.DASHBOARD),checkRolePermission,walletController.bulkUpdateWallet);
router.route('/dashboard/api/v1/wallet/delete/:id').delete(auth(PLATFORM.DASHBOARD),checkRolePermission,walletController.deleteWallet);
router.route('/dashboard/api/v1/wallet/deleteMany').post(auth(PLATFORM.DASHBOARD),checkRolePermission,walletController.deleteManyWallet);

module.exports = router;
