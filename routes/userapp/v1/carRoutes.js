/**
 * carRoutes.js
 * @description :: CRUD API routes for car
 */

const express = require('express');
const router = express.Router();
const carController = require('../../../controller/userapp/v1/carController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/userapp/api/v1/car/create').post(auth(PLATFORM.USERAPP),checkRolePermission,carController.addCar);
router.route('/userapp/api/v1/car/addBulk').post(auth(PLATFORM.USERAPP),checkRolePermission,carController.bulkInsertCar);
router.route('/userapp/api/v1/car/list').post(auth(PLATFORM.USERAPP),checkRolePermission,carController.findAllCar);
router.route('/userapp/api/v1/car/count').post(auth(PLATFORM.USERAPP),checkRolePermission,carController.getCarCount);
router.route('/userapp/api/v1/car/:id').get(auth(PLATFORM.USERAPP),checkRolePermission,carController.getCar);
router.route('/userapp/api/v1/car/update/:id').put(auth(PLATFORM.USERAPP),checkRolePermission,carController.updateCar);    
router.route('/userapp/api/v1/car/partial-update/:id').put(auth(PLATFORM.USERAPP),checkRolePermission,carController.partialUpdateCar);
router.route('/userapp/api/v1/car/updateBulk').put(auth(PLATFORM.USERAPP),checkRolePermission,carController.bulkUpdateCar);
router.route('/userapp/api/v1/car/softDelete/:id').put(auth(PLATFORM.USERAPP),checkRolePermission,carController.softDeleteCar);
router.route('/userapp/api/v1/car/softDeleteMany').put(auth(PLATFORM.USERAPP),checkRolePermission,carController.softDeleteManyCar);
router.route('/userapp/api/v1/car/delete/:id').delete(auth(PLATFORM.USERAPP),checkRolePermission,carController.deleteCar);
router.route('/userapp/api/v1/car/deleteMany').post(auth(PLATFORM.USERAPP),checkRolePermission,carController.deleteManyCar);

module.exports = router;
