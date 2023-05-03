/**
 * complaintRoutes.js
 * @description :: CRUD API routes for complaint
 */

const express = require('express');
const router = express.Router();
const complaintController = require('../../../controller/userapp/v1/complaintController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/userapp/api/v1/complaint/create').post(auth(PLATFORM.USERAPP),checkRolePermission,complaintController.addComplaint);
router.route('/userapp/api/v1/complaint/addBulk').post(auth(PLATFORM.USERAPP),checkRolePermission,complaintController.bulkInsertComplaint);
router.route('/userapp/api/v1/complaint/list').post(auth(PLATFORM.USERAPP),checkRolePermission,complaintController.findAllComplaint);
router.route('/userapp/api/v1/complaint/count').post(auth(PLATFORM.USERAPP),checkRolePermission,complaintController.getComplaintCount);
router.route('/userapp/api/v1/complaint/:id').get(auth(PLATFORM.USERAPP),checkRolePermission,complaintController.getComplaint);
router.route('/userapp/api/v1/complaint/update/:id').put(auth(PLATFORM.USERAPP),checkRolePermission,complaintController.updateComplaint);    
router.route('/userapp/api/v1/complaint/partial-update/:id').put(auth(PLATFORM.USERAPP),checkRolePermission,complaintController.partialUpdateComplaint);
router.route('/userapp/api/v1/complaint/updateBulk').put(auth(PLATFORM.USERAPP),checkRolePermission,complaintController.bulkUpdateComplaint);
router.route('/userapp/api/v1/complaint/softDelete/:id').put(auth(PLATFORM.USERAPP),checkRolePermission,complaintController.softDeleteComplaint);
router.route('/userapp/api/v1/complaint/softDeleteMany').put(auth(PLATFORM.USERAPP),checkRolePermission,complaintController.softDeleteManyComplaint);
router.route('/userapp/api/v1/complaint/delete/:id').delete(auth(PLATFORM.USERAPP),checkRolePermission,complaintController.deleteComplaint);
router.route('/userapp/api/v1/complaint/deleteMany').post(auth(PLATFORM.USERAPP),checkRolePermission,complaintController.deleteManyComplaint);

module.exports = router;
