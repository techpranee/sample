/**
 * washRoutes.js
 * @description :: CRUD API routes for wash
 */

const express = require('express');
const router = express.Router();
const washController = require('../../../controller/cleanerapp/v1/washController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/cleanerapp/api/v1/wash/create').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,washController.addWash);
router.route('/cleanerapp/api/v1/wash/addBulk').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,washController.bulkInsertWash);
router.route('/cleanerapp/api/v1/wash/list').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,washController.findAllWash);
router.route('/cleanerapp/api/v1/wash/count').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,washController.getWashCount);
router.route('/cleanerapp/api/v1/wash/:id').get(auth(PLATFORM.CLEANERAPP),checkRolePermission,washController.getWash);
router.route('/cleanerapp/api/v1/wash/update/:id').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,washController.updateWash);    
router.route('/cleanerapp/api/v1/wash/partial-update/:id').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,washController.partialUpdateWash);
router.route('/cleanerapp/api/v1/wash/updateBulk').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,washController.bulkUpdateWash);
router.route('/cleanerapp/api/v1/wash/softDelete/:id').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,washController.softDeleteWash);
router.route('/cleanerapp/api/v1/wash/softDeleteMany').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,washController.softDeleteManyWash);
router.route('/cleanerapp/api/v1/wash/delete/:id').delete(auth(PLATFORM.CLEANERAPP),checkRolePermission,washController.deleteWash);
router.route('/cleanerapp/api/v1/wash/deleteMany').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,washController.deleteManyWash);

module.exports = router;
