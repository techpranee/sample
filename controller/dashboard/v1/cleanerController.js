/**
 * cleanerController.js
 * @description : exports action methods for cleaner.
 */

const Cleaner = require('../../../model/cleaner');
const cleanerSchemaKey = require('../../../utils/validation/cleanerValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Cleaner in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Cleaner. {status, message, data}
 */ 
const addCleaner = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      cleanerSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate = new Cleaner(dataToCreate);
    let createdCleaner = await dbService.create(Cleaner,dataToCreate);
    return res.success({ data : createdCleaner });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Cleaner in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Cleaners. {status, message, data}
 */
const bulkInsertCleaner = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    let createdCleaners = await dbService.create(Cleaner,dataToCreate);
    createdCleaners = { count: createdCleaners ? createdCleaners.length : 0 };
    return res.success({ data:{ count:createdCleaners.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Cleaner from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Cleaner(s). {status, message, data}
 */
const findAllCleaner = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      cleanerSchemaKey.findFilterKeys,
      Cleaner.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Cleaner, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundCleaners = await dbService.paginate( Cleaner,query,options);
    if (!foundCleaners || !foundCleaners.data || !foundCleaners.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundCleaners });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Cleaner from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Cleaner. {status, message, data}
 */
const getCleaner = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundCleaner = await dbService.findOne(Cleaner,query, options);
    if (!foundCleaner){
      return res.recordNotFound();
    }
    return res.success({ data :foundCleaner });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Cleaner.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getCleanerCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      cleanerSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedCleaner = await dbService.count(Cleaner,where);
    return res.success({ data : { count: countedCleaner } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Cleaner with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Cleaner.
 * @return {Object} : updated Cleaner. {status, message, data}
 */
const updateCleaner = async (req,res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      cleanerSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedCleaner = await dbService.updateOne(Cleaner,query,dataToUpdate);
    if (!updatedCleaner){
      return res.recordNotFound();
    }
    return res.success({ data :updatedCleaner });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Cleaner with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Cleaners.
 * @return {Object} : updated Cleaners. {status, message, data}
 */
const bulkUpdateCleaner = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { ...req.body.data, };
    }
    let updatedCleaner = await dbService.updateMany(Cleaner,filter,dataToUpdate);
    if (!updatedCleaner){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedCleaner } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Cleaner with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Cleaner.
 * @return {obj} : updated Cleaner. {status, message, data}
 */
const partialUpdateCleaner = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      cleanerSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedCleaner = await dbService.updateOne(Cleaner, query, dataToUpdate);
    if (!updatedCleaner) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedCleaner });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Cleaner from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Cleaner.
 * @return {Object} : deactivated Cleaner. {status, message, data}
 */
const softDeleteCleaner = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedCleaner = await deleteDependentService.softDeleteCleaner(query, updateBody);
    if (!updatedCleaner){
      return res.recordNotFound();
    }
    return res.success({ data:updatedCleaner });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Cleaner from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Cleaner. {status, message, data}
 */
const deleteCleaner = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedCleaner;
    if (req.body.isWarning) { 
      deletedCleaner = await deleteDependentService.countCleaner(query);
    } else {
      deletedCleaner = await deleteDependentService.deleteCleaner(query);
    }
    if (!deletedCleaner){
      return res.recordNotFound();
    }
    return res.success({ data :deletedCleaner });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Cleaner in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyCleaner = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedCleaner;
    if (req.body.isWarning) {
      deletedCleaner = await deleteDependentService.countCleaner(query);
    }
    else {
      deletedCleaner = await deleteDependentService.deleteCleaner(query);
    }
    if (!deletedCleaner){
      return res.recordNotFound();
    }
    return res.success({ data :deletedCleaner });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Cleaner from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Cleaner.
 * @return {Object} : number of deactivated documents of Cleaner. {status, message, data}
 */
const softDeleteManyCleaner = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    let updatedCleaner = await deleteDependentService.softDeleteCleaner(query, updateBody);
    if (!updatedCleaner) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedCleaner });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addCleaner,
  bulkInsertCleaner,
  findAllCleaner,
  getCleaner,
  getCleanerCount,
  updateCleaner,
  bulkUpdateCleaner,
  partialUpdateCleaner,
  softDeleteCleaner,
  deleteCleaner,
  deleteManyCleaner,
  softDeleteManyCleaner    
};