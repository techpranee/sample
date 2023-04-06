/**
 * carRoutes.js
 * @description :: CRUD API routes for car
 */

const express = require('express');
const router = express.Router();
const carController = require('../../../controller/dashboard/v1/carController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/dashboard/api/v1/car/create').post(carController.addCar);
router.route('/dashboard/api/v1/car/addBulk').post(carController.bulkInsertCar);
router.route('/dashboard/api/v1/car/list').post(carController.findAllCar);
router.route('/dashboard/api/v1/car/count').post(carController.getCarCount);
router.route('/dashboard/api/v1/car/:id').get(carController.getCar);
router.route('/dashboard/api/v1/car/update/:id').put(carController.updateCar);    
router.route('/dashboard/api/v1/car/partial-update/:id').put(carController.partialUpdateCar);
router.route('/dashboard/api/v1/car/updateBulk').put(carController.bulkUpdateCar);
router.route('/dashboard/api/v1/car/softDelete/:id').put(carController.softDeleteCar);
router.route('/dashboard/api/v1/car/softDeleteMany').put(carController.softDeleteManyCar);
router.route('/dashboard/api/v1/car/delete/:id').delete(carController.deleteCar);
router.route('/dashboard/api/v1/car/deleteMany').post(carController.deleteManyCar);

module.exports = router;
