/**
 * bannerRoutes.js
 * @description :: CRUD API routes for banner
 */

const express = require('express');
const router = express.Router();
const bannerController = require('../../../controller/cleanerapp/v1/bannerController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/cleanerapp/api/v1/banner/create').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,bannerController.addBanner);
router.route('/cleanerapp/api/v1/banner/list').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,bannerController.findAllBanner);
router.route('/cleanerapp/api/v1/banner/count').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,bannerController.getBannerCount);
router.route('/cleanerapp/api/v1/banner/:id').get(auth(PLATFORM.CLEANERAPP),checkRolePermission,bannerController.getBanner);
router.route('/cleanerapp/api/v1/banner/update/:id').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,bannerController.updateBanner);    
router.route('/cleanerapp/api/v1/banner/partial-update/:id').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,bannerController.partialUpdateBanner);
router.route('/cleanerapp/api/v1/banner/softDelete/:id').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,bannerController.softDeleteBanner);
router.route('/cleanerapp/api/v1/banner/softDeleteMany').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,bannerController.softDeleteManyBanner);
router.route('/cleanerapp/api/v1/banner/addBulk').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,bannerController.bulkInsertBanner);
router.route('/cleanerapp/api/v1/banner/updateBulk').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,bannerController.bulkUpdateBanner);
router.route('/cleanerapp/api/v1/banner/delete/:id').delete(auth(PLATFORM.CLEANERAPP),checkRolePermission,bannerController.deleteBanner);
router.route('/cleanerapp/api/v1/banner/deleteMany').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,bannerController.deleteManyBanner);

module.exports = router;
