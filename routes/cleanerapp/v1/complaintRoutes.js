/**
 * complaintRoutes.js
 * @description :: CRUD API routes for complaint
 */

const express = require('express');
const router = express.Router();
const complaintController = require('../../../controller/cleanerapp/v1/complaintController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/cleanerapp/api/v1/complaint/create').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,complaintController.addComplaint);
router.route('/cleanerapp/api/v1/complaint/addBulk').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,complaintController.bulkInsertComplaint);
router.route('/cleanerapp/api/v1/complaint/list').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,complaintController.findAllComplaint);
router.route('/cleanerapp/api/v1/complaint/count').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,complaintController.getComplaintCount);
router.route('/cleanerapp/api/v1/complaint/:id').get(auth(PLATFORM.CLEANERAPP),checkRolePermission,complaintController.getComplaint);
router.route('/cleanerapp/api/v1/complaint/update/:id').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,complaintController.updateComplaint);    
router.route('/cleanerapp/api/v1/complaint/partial-update/:id').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,complaintController.partialUpdateComplaint);
router.route('/cleanerapp/api/v1/complaint/updateBulk').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,complaintController.bulkUpdateComplaint);
router.route('/cleanerapp/api/v1/complaint/softDelete/:id').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,complaintController.softDeleteComplaint);
router.route('/cleanerapp/api/v1/complaint/softDeleteMany').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,complaintController.softDeleteManyComplaint);
router.route('/cleanerapp/api/v1/complaint/delete/:id').delete(auth(PLATFORM.CLEANERAPP),checkRolePermission,complaintController.deleteComplaint);
router.route('/cleanerapp/api/v1/complaint/deleteMany').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,complaintController.deleteManyComplaint);

module.exports = router;
