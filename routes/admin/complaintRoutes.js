/**
 * complaintRoutes.js
 * @description :: CRUD API routes for complaint
 */

const express = require('express');
const router = express.Router();
const complaintController = require('../../controller/admin/complaintController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/complaint/create').post(auth(PLATFORM.ADMIN),checkRolePermission,complaintController.addComplaint);
router.route('/admin/complaint/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,complaintController.bulkInsertComplaint);
router.route('/admin/complaint/list').post(auth(PLATFORM.ADMIN),checkRolePermission,complaintController.findAllComplaint);
router.route('/admin/complaint/count').post(auth(PLATFORM.ADMIN),checkRolePermission,complaintController.getComplaintCount);
router.route('/admin/complaint/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,complaintController.getComplaint);
router.route('/admin/complaint/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,complaintController.updateComplaint);    
router.route('/admin/complaint/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,complaintController.partialUpdateComplaint);
router.route('/admin/complaint/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,complaintController.bulkUpdateComplaint);
router.route('/admin/complaint/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,complaintController.softDeleteComplaint);
router.route('/admin/complaint/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,complaintController.softDeleteManyComplaint);
router.route('/admin/complaint/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,complaintController.deleteComplaint);
router.route('/admin/complaint/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,complaintController.deleteManyComplaint);

module.exports = router;
