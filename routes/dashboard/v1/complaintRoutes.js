/**
 * complaintRoutes.js
 * @description :: CRUD API routes for complaint
 */

const express = require('express');
const router = express.Router();
const complaintController = require('../../../controller/dashboard/v1/complaintController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/dashboard/api/v1/complaint/create').post(auth(PLATFORM.DASHBOARD),checkRolePermission,complaintController.addComplaint);
router.route('/dashboard/api/v1/complaint/addBulk').post(auth(PLATFORM.DASHBOARD),checkRolePermission,complaintController.bulkInsertComplaint);
router.route('/dashboard/api/v1/complaint/list').post(auth(PLATFORM.DASHBOARD),checkRolePermission,complaintController.findAllComplaint);
router.route('/dashboard/api/v1/complaint/count').post(auth(PLATFORM.DASHBOARD),checkRolePermission,complaintController.getComplaintCount);
router.route('/dashboard/api/v1/complaint/:id').get(auth(PLATFORM.DASHBOARD),checkRolePermission,complaintController.getComplaint);
router.route('/dashboard/api/v1/complaint/update/:id').put(auth(PLATFORM.DASHBOARD),checkRolePermission,complaintController.updateComplaint);    
router.route('/dashboard/api/v1/complaint/partial-update/:id').put(auth(PLATFORM.DASHBOARD),checkRolePermission,complaintController.partialUpdateComplaint);
router.route('/dashboard/api/v1/complaint/updateBulk').put(auth(PLATFORM.DASHBOARD),checkRolePermission,complaintController.bulkUpdateComplaint);
router.route('/dashboard/api/v1/complaint/softDelete/:id').put(auth(PLATFORM.DASHBOARD),checkRolePermission,complaintController.softDeleteComplaint);
router.route('/dashboard/api/v1/complaint/softDeleteMany').put(auth(PLATFORM.DASHBOARD),checkRolePermission,complaintController.softDeleteManyComplaint);
router.route('/dashboard/api/v1/complaint/delete/:id').delete(auth(PLATFORM.DASHBOARD),checkRolePermission,complaintController.deleteComplaint);
router.route('/dashboard/api/v1/complaint/deleteMany').post(auth(PLATFORM.DASHBOARD),checkRolePermission,complaintController.deleteManyComplaint);

module.exports = router;
