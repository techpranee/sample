/**
 * packageRoutes.js
 * @description :: CRUD API routes for package
 */

const express = require('express');
const router = express.Router();
const packageController = require('../../../controller/dashboard/v1/packageController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/dashboard/api/v1/package/create').post(packageController.addPackage);
router.route('/dashboard/api/v1/package/addBulk').post(packageController.bulkInsertPackage);
router.route('/dashboard/api/v1/package/list').post(packageController.findAllPackage);
router.route('/dashboard/api/v1/package/count').post(packageController.getPackageCount);
router.route('/dashboard/api/v1/package/:id').get(packageController.getPackage);
router.route('/dashboard/api/v1/package/update/:id').put(packageController.updatePackage);    
router.route('/dashboard/api/v1/package/partial-update/:id').put(packageController.partialUpdatePackage);
router.route('/dashboard/api/v1/package/updateBulk').put(packageController.bulkUpdatePackage);
router.route('/dashboard/api/v1/package/softDelete/:id').put(packageController.softDeletePackage);
router.route('/dashboard/api/v1/package/softDeleteMany').put(packageController.softDeleteManyPackage);
router.route('/dashboard/api/v1/package/delete/:id').delete(packageController.deletePackage);
router.route('/dashboard/api/v1/package/deleteMany').post(packageController.deleteManyPackage);

module.exports = router;
