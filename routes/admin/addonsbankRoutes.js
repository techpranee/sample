/**
 * addonsbankRoutes.js
 * @description :: CRUD API routes for addonsbank
 */

const express = require('express');
const router = express.Router();
const addonsbankController = require('../../controller/admin/addonsbankController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/addonsbank/create').post(auth(PLATFORM.ADMIN),checkRolePermission,addonsbankController.addAddonsbank);
router.route('/admin/addonsbank/list').post(auth(PLATFORM.ADMIN),checkRolePermission,addonsbankController.findAllAddonsbank);
router.route('/admin/addonsbank/count').post(auth(PLATFORM.ADMIN),checkRolePermission,addonsbankController.getAddonsbankCount);
router.route('/admin/addonsbank/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,addonsbankController.getAddonsbank);
router.route('/admin/addonsbank/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,addonsbankController.updateAddonsbank);    
router.route('/admin/addonsbank/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,addonsbankController.partialUpdateAddonsbank);
router.route('/admin/addonsbank/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,addonsbankController.softDeleteAddonsbank);
router.route('/admin/addonsbank/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,addonsbankController.softDeleteManyAddonsbank);
router.route('/admin/addonsbank/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,addonsbankController.bulkInsertAddonsbank);
router.route('/admin/addonsbank/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,addonsbankController.bulkUpdateAddonsbank);
router.route('/admin/addonsbank/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,addonsbankController.deleteAddonsbank);
router.route('/admin/addonsbank/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,addonsbankController.deleteManyAddonsbank);

module.exports = router;
