/**
 * carRoutes.js
 * @description :: CRUD API routes for car
 */

const express = require('express');
const router = express.Router();
const carController = require('../../controller/admin/carController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/car/create').post(auth(PLATFORM.ADMIN),checkRolePermission,carController.addCar);
router.route('/admin/car/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,carController.bulkInsertCar);
router.route('/admin/car/list').post(auth(PLATFORM.ADMIN),checkRolePermission,carController.findAllCar);
router.route('/admin/car/count').post(auth(PLATFORM.ADMIN),checkRolePermission,carController.getCarCount);
router.route('/admin/car/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,carController.getCar);
router.route('/admin/car/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,carController.updateCar);    
router.route('/admin/car/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,carController.partialUpdateCar);
router.route('/admin/car/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,carController.bulkUpdateCar);
router.route('/admin/car/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,carController.softDeleteCar);
router.route('/admin/car/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,carController.softDeleteManyCar);
router.route('/admin/car/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,carController.deleteCar);
router.route('/admin/car/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,carController.deleteManyCar);

module.exports = router;
