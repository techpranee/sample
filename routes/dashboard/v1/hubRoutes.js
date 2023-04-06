/**
 * hubRoutes.js
 * @description :: CRUD API routes for hub
 */

const express = require('express');
const router = express.Router();
const hubController = require('../../../controller/dashboard/v1/hubController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/dashboard/api/v1/hub/create').post(hubController.addHub);
router.route('/dashboard/api/v1/hub/addBulk').post(hubController.bulkInsertHub);
router.route('/dashboard/api/v1/hub/list').post(hubController.findAllHub);
router.route('/dashboard/api/v1/hub/count').post(hubController.getHubCount);
router.route('/dashboard/api/v1/hub/:id').get(hubController.getHub);
router.route('/dashboard/api/v1/hub/update/:id').put(hubController.updateHub);    
router.route('/dashboard/api/v1/hub/partial-update/:id').put(hubController.partialUpdateHub);
router.route('/dashboard/api/v1/hub/updateBulk').put(hubController.bulkUpdateHub);
router.route('/dashboard/api/v1/hub/softDelete/:id').put(hubController.softDeleteHub);
router.route('/dashboard/api/v1/hub/softDeleteMany').put(hubController.softDeleteManyHub);
router.route('/dashboard/api/v1/hub/delete/:id').delete(hubController.deleteHub);
router.route('/dashboard/api/v1/hub/deleteMany').post(hubController.deleteManyHub);

module.exports = router;
