/**
 * carController.js
 * @description : exports action methods for car.
 */

const Car = require('../../../model/car');
const carSchemaKey = require('../../../utils/validation/carValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Car in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Car. {status, message, data}
 */ 
const addCar = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      carSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate = new Car(dataToCreate);
    let createdCar = await dbService.create(Car,dataToCreate);
    return res.success({ data : createdCar });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Car in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Cars. {status, message, data}
 */
const bulkInsertCar = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    let createdCars = await dbService.create(Car,dataToCreate);
    createdCars = { count: createdCars ? createdCars.length : 0 };
    return res.success({ data:{ count:createdCars.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Car from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Car(s). {status, message, data}
 */
const findAllCar = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      carSchemaKey.findFilterKeys,
      Car.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Car, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundCars = await dbService.paginate( Car,query,options);
    if (!foundCars || !foundCars.data || !foundCars.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundCars });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Car from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Car. {status, message, data}
 */
const getCar = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundCar = await dbService.findOne(Car,query, options);
    if (!foundCar){
      return res.recordNotFound();
    }
    return res.success({ data :foundCar });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Car.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getCarCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      carSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedCar = await dbService.count(Car,where);
    return res.success({ data : { count: countedCar } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Car with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Car.
 * @return {Object} : updated Car. {status, message, data}
 */
const updateCar = async (req,res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      carSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedCar = await dbService.updateOne(Car,query,dataToUpdate);
    if (!updatedCar){
      return res.recordNotFound();
    }
    return res.success({ data :updatedCar });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Car with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Cars.
 * @return {Object} : updated Cars. {status, message, data}
 */
const bulkUpdateCar = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { ...req.body.data, };
    }
    let updatedCar = await dbService.updateMany(Car,filter,dataToUpdate);
    if (!updatedCar){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedCar } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Car with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Car.
 * @return {obj} : updated Car. {status, message, data}
 */
const partialUpdateCar = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      carSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedCar = await dbService.updateOne(Car, query, dataToUpdate);
    if (!updatedCar) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedCar });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Car from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Car.
 * @return {Object} : deactivated Car. {status, message, data}
 */
const softDeleteCar = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedCar = await deleteDependentService.softDeleteCar(query, updateBody);
    if (!updatedCar){
      return res.recordNotFound();
    }
    return res.success({ data:updatedCar });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Car from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Car. {status, message, data}
 */
const deleteCar = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedCar;
    if (req.body.isWarning) { 
      deletedCar = await deleteDependentService.countCar(query);
    } else {
      deletedCar = await deleteDependentService.deleteCar(query);
    }
    if (!deletedCar){
      return res.recordNotFound();
    }
    return res.success({ data :deletedCar });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Car in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyCar = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedCar;
    if (req.body.isWarning) {
      deletedCar = await deleteDependentService.countCar(query);
    }
    else {
      deletedCar = await deleteDependentService.deleteCar(query);
    }
    if (!deletedCar){
      return res.recordNotFound();
    }
    return res.success({ data :deletedCar });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Car from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Car.
 * @return {Object} : number of deactivated documents of Car. {status, message, data}
 */
const softDeleteManyCar = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    let updatedCar = await deleteDependentService.softDeleteCar(query, updateBody);
    if (!updatedCar) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedCar });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addCar,
  bulkInsertCar,
  findAllCar,
  getCar,
  getCarCount,
  updateCar,
  bulkUpdateCar,
  partialUpdateCar,
  softDeleteCar,
  deleteCar,
  deleteManyCar,
  softDeleteManyCar    
};