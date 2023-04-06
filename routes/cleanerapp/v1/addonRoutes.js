/**
 * addonRoutes.js
 * @description :: CRUD API routes for addon
 */

const express = require('express');
const router = express.Router();
const addonController = require('../../../controller/cleanerapp/v1/addonController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/cleanerapp/api/v1/addon/create').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,addonController.addAddon);
router.route('/cleanerapp/api/v1/addon/addBulk').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,addonController.bulkInsertAddon);
router.route('/cleanerapp/api/v1/addon/list').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,addonController.findAllAddon);
router.route('/cleanerapp/api/v1/addon/count').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,addonController.getAddonCount);
router.route('/cleanerapp/api/v1/addon/:id').get(auth(PLATFORM.CLEANERAPP),checkRolePermission,addonController.getAddon);
router.route('/cleanerapp/api/v1/addon/update/:id').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,addonController.updateAddon);    
router.route('/cleanerapp/api/v1/addon/partial-update/:id').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,addonController.partialUpdateAddon);
router.route('/cleanerapp/api/v1/addon/updateBulk').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,addonController.bulkUpdateAddon);
router.route('/cleanerapp/api/v1/addon/softDelete/:id').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,addonController.softDeleteAddon);
router.route('/cleanerapp/api/v1/addon/softDeleteMany').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,addonController.softDeleteManyAddon);
router.route('/cleanerapp/api/v1/addon/delete/:id').delete(auth(PLATFORM.CLEANERAPP),checkRolePermission,addonController.deleteAddon);
router.route('/cleanerapp/api/v1/addon/deleteMany').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,addonController.deleteManyAddon);

module.exports = router;
