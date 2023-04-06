/**
 * hubRoutes.js
 * @description :: CRUD API routes for hub
 */

const express = require('express');
const router = express.Router();
const hubController = require('../../../controller/cleanerapp/v1/hubController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/cleanerapp/api/v1/hub/create').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,hubController.addHub);
router.route('/cleanerapp/api/v1/hub/addBulk').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,hubController.bulkInsertHub);
router.route('/cleanerapp/api/v1/hub/list').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,hubController.findAllHub);
router.route('/cleanerapp/api/v1/hub/count').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,hubController.getHubCount);
router.route('/cleanerapp/api/v1/hub/:id').get(auth(PLATFORM.CLEANERAPP),checkRolePermission,hubController.getHub);
router.route('/cleanerapp/api/v1/hub/update/:id').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,hubController.updateHub);    
router.route('/cleanerapp/api/v1/hub/partial-update/:id').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,hubController.partialUpdateHub);
router.route('/cleanerapp/api/v1/hub/updateBulk').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,hubController.bulkUpdateHub);
router.route('/cleanerapp/api/v1/hub/softDelete/:id').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,hubController.softDeleteHub);
router.route('/cleanerapp/api/v1/hub/softDeleteMany').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,hubController.softDeleteManyHub);
router.route('/cleanerapp/api/v1/hub/delete/:id').delete(auth(PLATFORM.CLEANERAPP),checkRolePermission,hubController.deleteHub);
router.route('/cleanerapp/api/v1/hub/deleteMany').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,hubController.deleteManyHub);

module.exports = router;
