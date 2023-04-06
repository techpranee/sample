/**
 * cleanerRoutes.js
 * @description :: CRUD API routes for cleaner
 */

const express = require('express');
const router = express.Router();
const cleanerController = require('../../../controller/dashboard/v1/cleanerController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/dashboard/api/v1/cleaner/create').post(cleanerController.addCleaner);
router.route('/dashboard/api/v1/cleaner/addBulk').post(cleanerController.bulkInsertCleaner);
router.route('/dashboard/api/v1/cleaner/list').post(cleanerController.findAllCleaner);
router.route('/dashboard/api/v1/cleaner/count').post(cleanerController.getCleanerCount);
router.route('/dashboard/api/v1/cleaner/:id').get(cleanerController.getCleaner);
router.route('/dashboard/api/v1/cleaner/update/:id').put(cleanerController.updateCleaner);    
router.route('/dashboard/api/v1/cleaner/partial-update/:id').put(cleanerController.partialUpdateCleaner);
router.route('/dashboard/api/v1/cleaner/updateBulk').put(cleanerController.bulkUpdateCleaner);
router.route('/dashboard/api/v1/cleaner/softDelete/:id').put(cleanerController.softDeleteCleaner);
router.route('/dashboard/api/v1/cleaner/softDeleteMany').put(cleanerController.softDeleteManyCleaner);
router.route('/dashboard/api/v1/cleaner/delete/:id').delete(cleanerController.deleteCleaner);
router.route('/dashboard/api/v1/cleaner/deleteMany').post(cleanerController.deleteManyCleaner);

module.exports = router;
