/**
 * bannerRoutes.js
 * @description :: CRUD API routes for banner
 */

const express = require('express');
const router = express.Router();
const bannerController = require('../../../controller/userapp/v1/bannerController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/userapp/api/v1/banner/create').post(auth(PLATFORM.USERAPP),checkRolePermission,bannerController.addBanner);
router.route('/userapp/api/v1/banner/list').post(auth(PLATFORM.USERAPP),checkRolePermission,bannerController.findAllBanner);
router.route('/userapp/api/v1/banner/count').post(auth(PLATFORM.USERAPP),checkRolePermission,bannerController.getBannerCount);
router.route('/userapp/api/v1/banner/:id').get(auth(PLATFORM.USERAPP),checkRolePermission,bannerController.getBanner);
router.route('/userapp/api/v1/banner/update/:id').put(auth(PLATFORM.USERAPP),checkRolePermission,bannerController.updateBanner);    
router.route('/userapp/api/v1/banner/partial-update/:id').put(auth(PLATFORM.USERAPP),checkRolePermission,bannerController.partialUpdateBanner);
router.route('/userapp/api/v1/banner/softDelete/:id').put(auth(PLATFORM.USERAPP),checkRolePermission,bannerController.softDeleteBanner);
router.route('/userapp/api/v1/banner/softDeleteMany').put(auth(PLATFORM.USERAPP),checkRolePermission,bannerController.softDeleteManyBanner);
router.route('/userapp/api/v1/banner/addBulk').post(auth(PLATFORM.USERAPP),checkRolePermission,bannerController.bulkInsertBanner);
router.route('/userapp/api/v1/banner/updateBulk').put(auth(PLATFORM.USERAPP),checkRolePermission,bannerController.bulkUpdateBanner);
router.route('/userapp/api/v1/banner/delete/:id').delete(auth(PLATFORM.USERAPP),checkRolePermission,bannerController.deleteBanner);
router.route('/userapp/api/v1/banner/deleteMany').post(auth(PLATFORM.USERAPP),checkRolePermission,bannerController.deleteManyBanner);

module.exports = router;
