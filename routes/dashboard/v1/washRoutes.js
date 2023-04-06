/**
 * washRoutes.js
 * @description :: CRUD API routes for wash
 */

const express = require('express');
const router = express.Router();
const washController = require('../../../controller/dashboard/v1/washController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/dashboard/api/v1/wash/create').post(washController.addWash);
router.route('/dashboard/api/v1/wash/addBulk').post(washController.bulkInsertWash);
router.route('/dashboard/api/v1/wash/list').post(washController.findAllWash);
router.route('/dashboard/api/v1/wash/count').post(washController.getWashCount);
router.route('/dashboard/api/v1/wash/:id').get(washController.getWash);
router.route('/dashboard/api/v1/wash/update/:id').put(washController.updateWash);    
router.route('/dashboard/api/v1/wash/partial-update/:id').put(washController.partialUpdateWash);
router.route('/dashboard/api/v1/wash/updateBulk').put(washController.bulkUpdateWash);
router.route('/dashboard/api/v1/wash/softDelete/:id').put(washController.softDeleteWash);
router.route('/dashboard/api/v1/wash/softDeleteMany').put(washController.softDeleteManyWash);
router.route('/dashboard/api/v1/wash/delete/:id').delete(washController.deleteWash);
router.route('/dashboard/api/v1/wash/deleteMany').post(washController.deleteManyWash);

module.exports = router;
