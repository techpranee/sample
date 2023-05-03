/**
 * hubRoutes.js
 * @description :: CRUD API routes for hub
 */

const express = require('express');
const router = express.Router();
const hubController = require('../../../controller/userapp/v1/hubController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/userapp/api/v1/hub/create').post(auth(PLATFORM.USERAPP),checkRolePermission,hubController.addHub);
router.route('/userapp/api/v1/hub/addBulk').post(auth(PLATFORM.USERAPP),checkRolePermission,hubController.bulkInsertHub);
router.route('/userapp/api/v1/hub/list').post(auth(PLATFORM.USERAPP),checkRolePermission,hubController.findAllHub);
router.route('/userapp/api/v1/hub/count').post(auth(PLATFORM.USERAPP),checkRolePermission,hubController.getHubCount);
router.route('/userapp/api/v1/hub/:id').get(auth(PLATFORM.USERAPP),checkRolePermission,hubController.getHub);
router.route('/userapp/api/v1/hub/update/:id').put(auth(PLATFORM.USERAPP),checkRolePermission,hubController.updateHub);    
router.route('/userapp/api/v1/hub/partial-update/:id').put(auth(PLATFORM.USERAPP),checkRolePermission,hubController.partialUpdateHub);
router.route('/userapp/api/v1/hub/updateBulk').put(auth(PLATFORM.USERAPP),checkRolePermission,hubController.bulkUpdateHub);
router.route('/userapp/api/v1/hub/softDelete/:id').put(auth(PLATFORM.USERAPP),checkRolePermission,hubController.softDeleteHub);
router.route('/userapp/api/v1/hub/softDeleteMany').put(auth(PLATFORM.USERAPP),checkRolePermission,hubController.softDeleteManyHub);
router.route('/userapp/api/v1/hub/delete/:id').delete(auth(PLATFORM.USERAPP),checkRolePermission,hubController.deleteHub);
router.route('/userapp/api/v1/hub/deleteMany').post(auth(PLATFORM.USERAPP),checkRolePermission,hubController.deleteManyHub);

module.exports = router;
