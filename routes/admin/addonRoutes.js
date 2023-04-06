/**
 * addonRoutes.js
 * @description :: CRUD API routes for addon
 */

const express = require('express');
const router = express.Router();
const addonController = require('../../controller/admin/addonController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/addon/create').post(auth(PLATFORM.ADMIN),checkRolePermission,addonController.addAddon);
router.route('/admin/addon/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,addonController.bulkInsertAddon);
router.route('/admin/addon/list').post(auth(PLATFORM.ADMIN),checkRolePermission,addonController.findAllAddon);
router.route('/admin/addon/count').post(auth(PLATFORM.ADMIN),checkRolePermission,addonController.getAddonCount);
router.route('/admin/addon/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,addonController.getAddon);
router.route('/admin/addon/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,addonController.updateAddon);    
router.route('/admin/addon/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,addonController.partialUpdateAddon);
router.route('/admin/addon/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,addonController.bulkUpdateAddon);
router.route('/admin/addon/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,addonController.softDeleteAddon);
router.route('/admin/addon/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,addonController.softDeleteManyAddon);
router.route('/admin/addon/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,addonController.deleteAddon);
router.route('/admin/addon/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,addonController.deleteManyAddon);

module.exports = router;
