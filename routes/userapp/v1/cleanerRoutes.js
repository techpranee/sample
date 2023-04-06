/**
 * cleanerRoutes.js
 * @description :: CRUD API routes for cleaner
 */

const express = require('express');
const router = express.Router();
const cleanerController = require('../../../controller/userapp/v1/cleanerController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/userapp/api/v1/cleaner/create').post(auth(PLATFORM.USERAPP),checkRolePermission,cleanerController.addCleaner);
router.route('/userapp/api/v1/cleaner/addBulk').post(auth(PLATFORM.USERAPP),checkRolePermission,cleanerController.bulkInsertCleaner);
router.route('/userapp/api/v1/cleaner/list').post(auth(PLATFORM.USERAPP),checkRolePermission,cleanerController.findAllCleaner);
router.route('/userapp/api/v1/cleaner/count').post(auth(PLATFORM.USERAPP),checkRolePermission,cleanerController.getCleanerCount);
router.route('/userapp/api/v1/cleaner/:id').get(auth(PLATFORM.USERAPP),checkRolePermission,cleanerController.getCleaner);
router.route('/userapp/api/v1/cleaner/update/:id').put(auth(PLATFORM.USERAPP),checkRolePermission,cleanerController.updateCleaner);    
router.route('/userapp/api/v1/cleaner/partial-update/:id').put(auth(PLATFORM.USERAPP),checkRolePermission,cleanerController.partialUpdateCleaner);
router.route('/userapp/api/v1/cleaner/updateBulk').put(auth(PLATFORM.USERAPP),checkRolePermission,cleanerController.bulkUpdateCleaner);
router.route('/userapp/api/v1/cleaner/softDelete/:id').put(auth(PLATFORM.USERAPP),checkRolePermission,cleanerController.softDeleteCleaner);
router.route('/userapp/api/v1/cleaner/softDeleteMany').put(auth(PLATFORM.USERAPP),checkRolePermission,cleanerController.softDeleteManyCleaner);
router.route('/userapp/api/v1/cleaner/delete/:id').delete(auth(PLATFORM.USERAPP),checkRolePermission,cleanerController.deleteCleaner);
router.route('/userapp/api/v1/cleaner/deleteMany').post(auth(PLATFORM.USERAPP),checkRolePermission,cleanerController.deleteManyCleaner);

module.exports = router;
