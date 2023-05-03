/**
 * walletRoutes.js
 * @description :: CRUD API routes for wallet
 */

const express = require('express');
const router = express.Router();
const walletController = require('../../../controller/cleanerapp/v1/walletController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/cleanerapp/api/v1/wallet/create').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,walletController.addWallet);
router.route('/cleanerapp/api/v1/wallet/list').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,walletController.findAllWallet);
router.route('/cleanerapp/api/v1/wallet/count').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,walletController.getWalletCount);
router.route('/cleanerapp/api/v1/wallet/:id').get(auth(PLATFORM.CLEANERAPP),checkRolePermission,walletController.getWallet);
router.route('/cleanerapp/api/v1/wallet/update/:id').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,walletController.updateWallet);    
router.route('/cleanerapp/api/v1/wallet/partial-update/:id').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,walletController.partialUpdateWallet);
router.route('/cleanerapp/api/v1/wallet/softDelete/:id').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,walletController.softDeleteWallet);
router.route('/cleanerapp/api/v1/wallet/softDeleteMany').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,walletController.softDeleteManyWallet);
router.route('/cleanerapp/api/v1/wallet/addBulk').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,walletController.bulkInsertWallet);
router.route('/cleanerapp/api/v1/wallet/updateBulk').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,walletController.bulkUpdateWallet);
router.route('/cleanerapp/api/v1/wallet/delete/:id').delete(auth(PLATFORM.CLEANERAPP),checkRolePermission,walletController.deleteWallet);
router.route('/cleanerapp/api/v1/wallet/deleteMany').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,walletController.deleteManyWallet);

module.exports = router;
