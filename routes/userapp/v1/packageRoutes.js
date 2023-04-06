/**
 * packageRoutes.js
 * @description :: CRUD API routes for package
 */

const express = require('express');
const router = express.Router();
const packageController = require('../../../controller/userapp/v1/packageController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/userapp/api/v1/package/create').post(auth(PLATFORM.USERAPP),checkRolePermission,packageController.addPackage);
router.route('/userapp/api/v1/package/addBulk').post(auth(PLATFORM.USERAPP),checkRolePermission,packageController.bulkInsertPackage);
router.route('/userapp/api/v1/package/list').post(auth(PLATFORM.USERAPP),checkRolePermission,packageController.findAllPackage);
router.route('/userapp/api/v1/package/count').post(auth(PLATFORM.USERAPP),checkRolePermission,packageController.getPackageCount);
router.route('/userapp/api/v1/package/:id').get(auth(PLATFORM.USERAPP),checkRolePermission,packageController.getPackage);
router.route('/userapp/api/v1/package/update/:id').put(auth(PLATFORM.USERAPP),checkRolePermission,packageController.updatePackage);    
router.route('/userapp/api/v1/package/partial-update/:id').put(auth(PLATFORM.USERAPP),checkRolePermission,packageController.partialUpdatePackage);
router.route('/userapp/api/v1/package/updateBulk').put(auth(PLATFORM.USERAPP),checkRolePermission,packageController.bulkUpdatePackage);
router.route('/userapp/api/v1/package/softDelete/:id').put(auth(PLATFORM.USERAPP),checkRolePermission,packageController.softDeletePackage);
router.route('/userapp/api/v1/package/softDeleteMany').put(auth(PLATFORM.USERAPP),checkRolePermission,packageController.softDeleteManyPackage);
router.route('/userapp/api/v1/package/delete/:id').delete(auth(PLATFORM.USERAPP),checkRolePermission,packageController.deletePackage);
router.route('/userapp/api/v1/package/deleteMany').post(auth(PLATFORM.USERAPP),checkRolePermission,packageController.deleteManyPackage);

module.exports = router;
