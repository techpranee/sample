/**
 * bannerRoutes.js
 * @description :: CRUD API routes for banner
 */

const express = require('express');
const router = express.Router();
const bannerController = require('../../../controller/dashboard/v1/bannerController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/dashboard/api/v1/banner/create').post(auth(PLATFORM.DASHBOARD),checkRolePermission,bannerController.addBanner);
router.route('/dashboard/api/v1/banner/list').post(auth(PLATFORM.DASHBOARD),checkRolePermission,bannerController.findAllBanner);
router.route('/dashboard/api/v1/banner/count').post(auth(PLATFORM.DASHBOARD),checkRolePermission,bannerController.getBannerCount);
router.route('/dashboard/api/v1/banner/:id').get(auth(PLATFORM.DASHBOARD),checkRolePermission,bannerController.getBanner);
router.route('/dashboard/api/v1/banner/update/:id').put(auth(PLATFORM.DASHBOARD),checkRolePermission,bannerController.updateBanner);    
router.route('/dashboard/api/v1/banner/partial-update/:id').put(auth(PLATFORM.DASHBOARD),checkRolePermission,bannerController.partialUpdateBanner);
router.route('/dashboard/api/v1/banner/softDelete/:id').put(auth(PLATFORM.DASHBOARD),checkRolePermission,bannerController.softDeleteBanner);
router.route('/dashboard/api/v1/banner/softDeleteMany').put(auth(PLATFORM.DASHBOARD),checkRolePermission,bannerController.softDeleteManyBanner);
router.route('/dashboard/api/v1/banner/addBulk').post(auth(PLATFORM.DASHBOARD),checkRolePermission,bannerController.bulkInsertBanner);
router.route('/dashboard/api/v1/banner/updateBulk').put(auth(PLATFORM.DASHBOARD),checkRolePermission,bannerController.bulkUpdateBanner);
router.route('/dashboard/api/v1/banner/delete/:id').delete(auth(PLATFORM.DASHBOARD),checkRolePermission,bannerController.deleteBanner);
router.route('/dashboard/api/v1/banner/deleteMany').post(auth(PLATFORM.DASHBOARD),checkRolePermission,bannerController.deleteManyBanner);

module.exports = router;
