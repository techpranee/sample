/**
 * hubRoutes.js
 * @description :: CRUD API routes for hub
 */

const express = require('express');
const router = express.Router();
const hubController = require('../../controller/admin/hubController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/hub/create').post(auth(PLATFORM.ADMIN),checkRolePermission,hubController.addHub);
router.route('/admin/hub/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,hubController.bulkInsertHub);
router.route('/admin/hub/list').post(auth(PLATFORM.ADMIN),checkRolePermission,hubController.findAllHub);
router.route('/admin/hub/count').post(auth(PLATFORM.ADMIN),checkRolePermission,hubController.getHubCount);
router.route('/admin/hub/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,hubController.getHub);
router.route('/admin/hub/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,hubController.updateHub);    
router.route('/admin/hub/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,hubController.partialUpdateHub);
router.route('/admin/hub/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,hubController.bulkUpdateHub);
router.route('/admin/hub/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,hubController.softDeleteHub);
router.route('/admin/hub/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,hubController.softDeleteManyHub);
router.route('/admin/hub/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,hubController.deleteHub);
router.route('/admin/hub/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,hubController.deleteManyHub);

module.exports = router;
