/**
 * packageRoutes.js
 * @description :: CRUD API routes for package
 */

const express = require('express');
const router = express.Router();
const packageController = require('../../../controller/cleanerapp/v1/packageController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/cleanerapp/api/v1/package/create').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,packageController.addPackage);
router.route('/cleanerapp/api/v1/package/addBulk').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,packageController.bulkInsertPackage);
router.route('/cleanerapp/api/v1/package/list').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,packageController.findAllPackage);
router.route('/cleanerapp/api/v1/package/count').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,packageController.getPackageCount);
router.route('/cleanerapp/api/v1/package/:id').get(auth(PLATFORM.CLEANERAPP),checkRolePermission,packageController.getPackage);
router.route('/cleanerapp/api/v1/package/update/:id').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,packageController.updatePackage);    
router.route('/cleanerapp/api/v1/package/partial-update/:id').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,packageController.partialUpdatePackage);
router.route('/cleanerapp/api/v1/package/updateBulk').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,packageController.bulkUpdatePackage);
router.route('/cleanerapp/api/v1/package/softDelete/:id').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,packageController.softDeletePackage);
router.route('/cleanerapp/api/v1/package/softDeleteMany').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,packageController.softDeleteManyPackage);
router.route('/cleanerapp/api/v1/package/delete/:id').delete(auth(PLATFORM.CLEANERAPP),checkRolePermission,packageController.deletePackage);
router.route('/cleanerapp/api/v1/package/deleteMany').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,packageController.deleteManyPackage);

module.exports = router;
