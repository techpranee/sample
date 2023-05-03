/**
 * cleanerRoutes.js
 * @description :: CRUD API routes for cleaner
 */

const express = require('express');
const router = express.Router();
const cleanerController = require('../../controller/admin/cleanerController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/cleaner/create').post(auth(PLATFORM.ADMIN),checkRolePermission,cleanerController.addCleaner);
router.route('/admin/cleaner/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,cleanerController.bulkInsertCleaner);
router.route('/admin/cleaner/list').post(auth(PLATFORM.ADMIN),checkRolePermission,cleanerController.findAllCleaner);
router.route('/admin/cleaner/count').post(auth(PLATFORM.ADMIN),checkRolePermission,cleanerController.getCleanerCount);
router.route('/admin/cleaner/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,cleanerController.getCleaner);
router.route('/admin/cleaner/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,cleanerController.updateCleaner);    
router.route('/admin/cleaner/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,cleanerController.partialUpdateCleaner);
router.route('/admin/cleaner/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,cleanerController.bulkUpdateCleaner);
router.route('/admin/cleaner/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,cleanerController.softDeleteCleaner);
router.route('/admin/cleaner/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,cleanerController.softDeleteManyCleaner);
router.route('/admin/cleaner/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,cleanerController.deleteCleaner);
router.route('/admin/cleaner/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,cleanerController.deleteManyCleaner);

module.exports = router;
