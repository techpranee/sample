/**
 * addonRoutes.js
 * @description :: CRUD API routes for addon
 */

const express = require('express');
const router = express.Router();
const addonController = require('../../../controller/dashboard/v1/addonController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/dashboard/api/v1/addon/create').post(addonController.addAddon);
router.route('/dashboard/api/v1/addon/addBulk').post(addonController.bulkInsertAddon);
router.route('/dashboard/api/v1/addon/list').post(addonController.findAllAddon);
router.route('/dashboard/api/v1/addon/count').post(addonController.getAddonCount);
router.route('/dashboard/api/v1/addon/:id').get(addonController.getAddon);
router.route('/dashboard/api/v1/addon/update/:id').put(addonController.updateAddon);    
router.route('/dashboard/api/v1/addon/partial-update/:id').put(addonController.partialUpdateAddon);
router.route('/dashboard/api/v1/addon/updateBulk').put(addonController.bulkUpdateAddon);
router.route('/dashboard/api/v1/addon/softDelete/:id').put(addonController.softDeleteAddon);
router.route('/dashboard/api/v1/addon/softDeleteMany').put(addonController.softDeleteManyAddon);
router.route('/dashboard/api/v1/addon/delete/:id').delete(addonController.deleteAddon);
router.route('/dashboard/api/v1/addon/deleteMany').post(addonController.deleteManyAddon);

module.exports = router;
