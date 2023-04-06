/**
 * carRoutes.js
 * @description :: CRUD API routes for car
 */

const express = require('express');
const router = express.Router();
const carController = require('../../../controller/cleanerapp/v1/carController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/cleanerapp/api/v1/car/create').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,carController.addCar);
router.route('/cleanerapp/api/v1/car/addBulk').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,carController.bulkInsertCar);
router.route('/cleanerapp/api/v1/car/list').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,carController.findAllCar);
router.route('/cleanerapp/api/v1/car/count').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,carController.getCarCount);
router.route('/cleanerapp/api/v1/car/:id').get(auth(PLATFORM.CLEANERAPP),checkRolePermission,carController.getCar);
router.route('/cleanerapp/api/v1/car/update/:id').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,carController.updateCar);    
router.route('/cleanerapp/api/v1/car/partial-update/:id').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,carController.partialUpdateCar);
router.route('/cleanerapp/api/v1/car/updateBulk').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,carController.bulkUpdateCar);
router.route('/cleanerapp/api/v1/car/softDelete/:id').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,carController.softDeleteCar);
router.route('/cleanerapp/api/v1/car/softDeleteMany').put(auth(PLATFORM.CLEANERAPP),checkRolePermission,carController.softDeleteManyCar);
router.route('/cleanerapp/api/v1/car/delete/:id').delete(auth(PLATFORM.CLEANERAPP),checkRolePermission,carController.deleteCar);
router.route('/cleanerapp/api/v1/car/deleteMany').post(auth(PLATFORM.CLEANERAPP),checkRolePermission,carController.deleteManyCar);

module.exports = router;
