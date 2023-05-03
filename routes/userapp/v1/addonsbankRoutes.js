/**
 * addonsbankRoutes.js
 * @description :: CRUD API routes for addonsbank
 */

const express = require('express');
const router = express.Router();
const addonsbankController = require('../../../controller/userapp/v1/addonsbankController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/userapp/api/v1/addonsbank/create').post(auth(PLATFORM.USERAPP),checkRolePermission,addonsbankController.addAddonsbank);
router.route('/userapp/api/v1/addonsbank/list').post(auth(PLATFORM.USERAPP),checkRolePermission,addonsbankController.findAllAddonsbank);
router.route('/userapp/api/v1/addonsbank/count').post(auth(PLATFORM.USERAPP),checkRolePermission,addonsbankController.getAddonsbankCount);
router.route('/userapp/api/v1/addonsbank/:id').get(auth(PLATFORM.USERAPP),checkRolePermission,addonsbankController.getAddonsbank);
router.route('/userapp/api/v1/addonsbank/update/:id').put(auth(PLATFORM.USERAPP),checkRolePermission,addonsbankController.updateAddonsbank);    
router.route('/userapp/api/v1/addonsbank/partial-update/:id').put(auth(PLATFORM.USERAPP),checkRolePermission,addonsbankController.partialUpdateAddonsbank);
router.route('/userapp/api/v1/addonsbank/softDelete/:id').put(auth(PLATFORM.USERAPP),checkRolePermission,addonsbankController.softDeleteAddonsbank);
router.route('/userapp/api/v1/addonsbank/softDeleteMany').put(auth(PLATFORM.USERAPP),checkRolePermission,addonsbankController.softDeleteManyAddonsbank);
router.route('/userapp/api/v1/addonsbank/addBulk').post(auth(PLATFORM.USERAPP),checkRolePermission,addonsbankController.bulkInsertAddonsbank);
router.route('/userapp/api/v1/addonsbank/updateBulk').put(auth(PLATFORM.USERAPP),checkRolePermission,addonsbankController.bulkUpdateAddonsbank);
router.route('/userapp/api/v1/addonsbank/delete/:id').delete(auth(PLATFORM.USERAPP),checkRolePermission,addonsbankController.deleteAddonsbank);
router.route('/userapp/api/v1/addonsbank/deleteMany').post(auth(PLATFORM.USERAPP),checkRolePermission,addonsbankController.deleteManyAddonsbank);

module.exports = router;
