/**
 * addonsbankRoutes.js
 * @description :: CRUD API routes for addonsbank
 */

const express = require('express');
const router = express.Router();
const addonsbankController = require('../../../controller/dashboard/v1/addonsbankController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/dashboard/api/v1/addonsbank/create').post(auth(PLATFORM.DASHBOARD),checkRolePermission,addonsbankController.addAddonsbank);
router.route('/dashboard/api/v1/addonsbank/list').post(auth(PLATFORM.DASHBOARD),checkRolePermission,addonsbankController.findAllAddonsbank);
router.route('/dashboard/api/v1/addonsbank/count').post(auth(PLATFORM.DASHBOARD),checkRolePermission,addonsbankController.getAddonsbankCount);
router.route('/dashboard/api/v1/addonsbank/:id').get(auth(PLATFORM.DASHBOARD),checkRolePermission,addonsbankController.getAddonsbank);
router.route('/dashboard/api/v1/addonsbank/update/:id').put(auth(PLATFORM.DASHBOARD),checkRolePermission,addonsbankController.updateAddonsbank);    
router.route('/dashboard/api/v1/addonsbank/partial-update/:id').put(auth(PLATFORM.DASHBOARD),checkRolePermission,addonsbankController.partialUpdateAddonsbank);
router.route('/dashboard/api/v1/addonsbank/softDelete/:id').put(auth(PLATFORM.DASHBOARD),checkRolePermission,addonsbankController.softDeleteAddonsbank);
router.route('/dashboard/api/v1/addonsbank/softDeleteMany').put(auth(PLATFORM.DASHBOARD),checkRolePermission,addonsbankController.softDeleteManyAddonsbank);
router.route('/dashboard/api/v1/addonsbank/addBulk').post(auth(PLATFORM.DASHBOARD),checkRolePermission,addonsbankController.bulkInsertAddonsbank);
router.route('/dashboard/api/v1/addonsbank/updateBulk').put(auth(PLATFORM.DASHBOARD),checkRolePermission,addonsbankController.bulkUpdateAddonsbank);
router.route('/dashboard/api/v1/addonsbank/delete/:id').delete(auth(PLATFORM.DASHBOARD),checkRolePermission,addonsbankController.deleteAddonsbank);
router.route('/dashboard/api/v1/addonsbank/deleteMany').post(auth(PLATFORM.DASHBOARD),checkRolePermission,addonsbankController.deleteManyAddonsbank);

module.exports = router;
