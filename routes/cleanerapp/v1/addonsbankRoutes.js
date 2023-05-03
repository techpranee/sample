/**
 * addonsbankRoutes.js
 * @description :: CRUD API routes for addonsbank
 */

const express = require('express');
const router = express.Router();
const addonsbankController = require('../../../controller/cleanerapp/v1/addonsbankController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/cleanerapp/api/v1/addonsbank/create').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,addonsbankController.addAddonsbank);
router.route('/cleanerapp/api/v1/addonsbank/list').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,addonsbankController.findAllAddonsbank);
router.route('/cleanerapp/api/v1/addonsbank/count').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,addonsbankController.getAddonsbankCount);
router.route('/cleanerapp/api/v1/addonsbank/:id').get(auth(PLATFORM.CLEANERAPP),checkRolePermission,addonsbankController.getAddonsbank);
router.route('/cleanerapp/api/v1/addonsbank/update/:id').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,addonsbankController.updateAddonsbank);    
router.route('/cleanerapp/api/v1/addonsbank/partial-update/:id').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,addonsbankController.partialUpdateAddonsbank);
router.route('/cleanerapp/api/v1/addonsbank/softDelete/:id').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,addonsbankController.softDeleteAddonsbank);
router.route('/cleanerapp/api/v1/addonsbank/softDeleteMany').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,addonsbankController.softDeleteManyAddonsbank);
router.route('/cleanerapp/api/v1/addonsbank/addBulk').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,addonsbankController.bulkInsertAddonsbank);
router.route('/cleanerapp/api/v1/addonsbank/updateBulk').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,addonsbankController.bulkUpdateAddonsbank);
router.route('/cleanerapp/api/v1/addonsbank/delete/:id').delete(auth(PLATFORM.CLEANERAPP),checkRolePermission,addonsbankController.deleteAddonsbank);
router.route('/cleanerapp/api/v1/addonsbank/deleteMany').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,addonsbankController.deleteManyAddonsbank);

module.exports = router;
