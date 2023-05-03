/**
 * walletRoutes.js
 * @description :: CRUD API routes for wallet
 */

const express = require('express');
const router = express.Router();
const walletController = require('../../../controller/userapp/v1/walletController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/userapp/api/v1/wallet/create').post(auth(PLATFORM.USERAPP),checkRolePermission,walletController.addWallet);
router.route('/userapp/api/v1/wallet/list').post(auth(PLATFORM.USERAPP),checkRolePermission,walletController.findAllWallet);
router.route('/userapp/api/v1/wallet/count').post(auth(PLATFORM.USERAPP),checkRolePermission,walletController.getWalletCount);
router.route('/userapp/api/v1/wallet/:id').get(auth(PLATFORM.USERAPP),checkRolePermission,walletController.getWallet);
router.route('/userapp/api/v1/wallet/update/:id').put(auth(PLATFORM.USERAPP),checkRolePermission,walletController.updateWallet);    
router.route('/userapp/api/v1/wallet/partial-update/:id').put(auth(PLATFORM.USERAPP),checkRolePermission,walletController.partialUpdateWallet);
router.route('/userapp/api/v1/wallet/softDelete/:id').put(auth(PLATFORM.USERAPP),checkRolePermission,walletController.softDeleteWallet);
router.route('/userapp/api/v1/wallet/softDeleteMany').put(auth(PLATFORM.USERAPP),checkRolePermission,walletController.softDeleteManyWallet);
router.route('/userapp/api/v1/wallet/addBulk').post(auth(PLATFORM.USERAPP),checkRolePermission,walletController.bulkInsertWallet);
router.route('/userapp/api/v1/wallet/updateBulk').put(auth(PLATFORM.USERAPP),checkRolePermission,walletController.bulkUpdateWallet);
router.route('/userapp/api/v1/wallet/delete/:id').delete(auth(PLATFORM.USERAPP),checkRolePermission,walletController.deleteWallet);
router.route('/userapp/api/v1/wallet/deleteMany').post(auth(PLATFORM.USERAPP),checkRolePermission,walletController.deleteManyWallet);

module.exports = router;
