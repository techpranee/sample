/**
 * washRoutes.js
 * @description :: CRUD API routes for wash
 */

const express = require('express');
const router = express.Router();
const washController = require('../../../controller/userapp/v1/washController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/userapp/api/v1/wash/create').post(auth(PLATFORM.USERAPP),checkRolePermission,washController.addWash);
router.route('/userapp/api/v1/wash/addBulk').post(auth(PLATFORM.USERAPP),checkRolePermission,washController.bulkInsertWash);
router.route('/userapp/api/v1/wash/list').post(auth(PLATFORM.USERAPP),checkRolePermission,washController.findAllWash);
router.route('/userapp/api/v1/wash/count').post(auth(PLATFORM.USERAPP),checkRolePermission,washController.getWashCount);
router.route('/userapp/api/v1/wash/:id').get(auth(PLATFORM.USERAPP),checkRolePermission,washController.getWash);
router.route('/userapp/api/v1/wash/update/:id').put(auth(PLATFORM.USERAPP),checkRolePermission,washController.updateWash);    
router.route('/userapp/api/v1/wash/partial-update/:id').put(auth(PLATFORM.USERAPP),checkRolePermission,washController.partialUpdateWash);
router.route('/userapp/api/v1/wash/updateBulk').put(auth(PLATFORM.USERAPP),checkRolePermission,washController.bulkUpdateWash);
router.route('/userapp/api/v1/wash/softDelete/:id').put(auth(PLATFORM.USERAPP),checkRolePermission,washController.softDeleteWash);
router.route('/userapp/api/v1/wash/softDeleteMany').put(auth(PLATFORM.USERAPP),checkRolePermission,washController.softDeleteManyWash);
router.route('/userapp/api/v1/wash/delete/:id').delete(auth(PLATFORM.USERAPP),checkRolePermission,washController.deleteWash);
router.route('/userapp/api/v1/wash/deleteMany').post(auth(PLATFORM.USERAPP),checkRolePermission,washController.deleteManyWash);

module.exports = router;
