/**
 * washRoutes.js
 * @description :: CRUD API routes for wash
 */

const express = require('express');
const router = express.Router();
const washController = require('../../controller/admin/washController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/wash/create').post(auth(PLATFORM.ADMIN),checkRolePermission,washController.addWash);
router.route('/admin/wash/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,washController.bulkInsertWash);
router.route('/admin/wash/list').post(auth(PLATFORM.ADMIN),checkRolePermission,washController.findAllWash);
router.route('/admin/wash/count').post(auth(PLATFORM.ADMIN),checkRolePermission,washController.getWashCount);
router.route('/admin/wash/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,washController.getWash);
router.route('/admin/wash/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,washController.updateWash);    
router.route('/admin/wash/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,washController.partialUpdateWash);
router.route('/admin/wash/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,washController.bulkUpdateWash);
router.route('/admin/wash/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,washController.softDeleteWash);
router.route('/admin/wash/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,washController.softDeleteManyWash);
router.route('/admin/wash/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,washController.deleteWash);
router.route('/admin/wash/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,washController.deleteManyWash);

module.exports = router;
