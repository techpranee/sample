/**
 * cleanerRoutes.js
 * @description :: CRUD API routes for cleaner
 */

const express = require('express');
const router = express.Router();
const cleanerController = require('../../../controller/cleanerapp/v1/cleanerController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/cleanerapp/api/v1/cleaner/create').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,cleanerController.addCleaner);
router.route('/cleanerapp/api/v1/cleaner/addBulk').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,cleanerController.bulkInsertCleaner);
router.route('/cleanerapp/api/v1/cleaner/list').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,cleanerController.findAllCleaner);
router.route('/cleanerapp/api/v1/cleaner/count').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,cleanerController.getCleanerCount);
router.route('/cleanerapp/api/v1/cleaner/:id').get(auth(PLATFORM.CLEANERAPP),checkRolePermission,cleanerController.getCleaner);
router.route('/cleanerapp/api/v1/cleaner/update/:id').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,cleanerController.updateCleaner);    
router.route('/cleanerapp/api/v1/cleaner/partial-update/:id').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,cleanerController.partialUpdateCleaner);
router.route('/cleanerapp/api/v1/cleaner/updateBulk').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,cleanerController.bulkUpdateCleaner);
router.route('/cleanerapp/api/v1/cleaner/softDelete/:id').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,cleanerController.softDeleteCleaner);
router.route('/cleanerapp/api/v1/cleaner/softDeleteMany').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,cleanerController.softDeleteManyCleaner);
router.route('/cleanerapp/api/v1/cleaner/delete/:id').delete(auth(PLATFORM.CLEANERAPP),checkRolePermission,cleanerController.deleteCleaner);
router.route('/cleanerapp/api/v1/cleaner/deleteMany').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,cleanerController.deleteManyCleaner);

module.exports = router;
