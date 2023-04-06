/**
 * packageRoutes.js
 * @description :: CRUD API routes for package
 */

const express = require('express');
const router = express.Router();
const packageController = require('../../controller/admin/packageController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/package/create').post(auth(PLATFORM.ADMIN),checkRolePermission,packageController.addPackage);
router.route('/admin/package/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,packageController.bulkInsertPackage);
router.route('/admin/package/list').post(auth(PLATFORM.ADMIN),checkRolePermission,packageController.findAllPackage);
router.route('/admin/package/count').post(auth(PLATFORM.ADMIN),checkRolePermission,packageController.getPackageCount);
router.route('/admin/package/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,packageController.getPackage);
router.route('/admin/package/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,packageController.updatePackage);    
router.route('/admin/package/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,packageController.partialUpdatePackage);
router.route('/admin/package/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,packageController.bulkUpdatePackage);
router.route('/admin/package/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,packageController.softDeletePackage);
router.route('/admin/package/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,packageController.softDeleteManyPackage);
router.route('/admin/package/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,packageController.deletePackage);
router.route('/admin/package/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,packageController.deleteManyPackage);

module.exports = router;
