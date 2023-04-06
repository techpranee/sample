/**
 * addonRoutes.js
 * @description :: CRUD API routes for addon
 */

const express = require('express');
const router = express.Router();
const addonController = require('../../../controller/userapp/v1/addonController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/userapp/api/v1/addon/create').post(auth(PLATFORM.USERAPP),checkRolePermission,addonController.addAddon);
router.route('/userapp/api/v1/addon/addBulk').post(auth(PLATFORM.USERAPP),checkRolePermission,addonController.bulkInsertAddon);
router.route('/userapp/api/v1/addon/list').post(auth(PLATFORM.USERAPP),checkRolePermission,addonController.findAllAddon);
router.route('/userapp/api/v1/addon/count').post(auth(PLATFORM.USERAPP),checkRolePermission,addonController.getAddonCount);
router.route('/userapp/api/v1/addon/:id').get(auth(PLATFORM.USERAPP),checkRolePermission,addonController.getAddon);
router.route('/userapp/api/v1/addon/update/:id').put(auth(PLATFORM.USERAPP),checkRolePermission,addonController.updateAddon);    
router.route('/userapp/api/v1/addon/partial-update/:id').put(auth(PLATFORM.USERAPP),checkRolePermission,addonController.partialUpdateAddon);
router.route('/userapp/api/v1/addon/updateBulk').put(auth(PLATFORM.USERAPP),checkRolePermission,addonController.bulkUpdateAddon);
router.route('/userapp/api/v1/addon/softDelete/:id').put(auth(PLATFORM.USERAPP),checkRolePermission,addonController.softDeleteAddon);
router.route('/userapp/api/v1/addon/softDeleteMany').put(auth(PLATFORM.USERAPP),checkRolePermission,addonController.softDeleteManyAddon);
router.route('/userapp/api/v1/addon/delete/:id').delete(auth(PLATFORM.USERAPP),checkRolePermission,addonController.deleteAddon);
router.route('/userapp/api/v1/addon/deleteMany').post(auth(PLATFORM.USERAPP),checkRolePermission,addonController.deleteManyAddon);

module.exports = router;
