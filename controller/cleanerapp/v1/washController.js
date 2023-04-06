/**
 * washController.js
 * @description : exports action methods for wash.
 */

const Wash = require('../../../model/wash');
const washSchemaKey = require('../../../utils/validation/washValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Wash in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Wash. {status, message, data}
 */ 
const addWash = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      washSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate = new Wash(dataToCreate);
    let createdWash = await dbService.create(Wash,dataToCreate);
    return res.success({ data : createdWash });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Wash in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Washs. {status, message, data}
 */
const bulkInsertWash = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    let createdWashs = await dbService.create(Wash,dataToCreate);
    createdWashs = { count: createdWashs ? createdWashs.length : 0 };
    return res.success({ data:{ count:createdWashs.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Wash from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Wash(s). {status, message, data}
 */
const findAllWash = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      washSchemaKey.findFilterKeys,
      Wash.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Wash, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundWashs = await dbService.paginate( Wash,query,options);
    if (!foundWashs || !foundWashs.data || !foundWashs.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundWashs });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Wash from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Wash. {status, message, data}
 */
const getWash = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundWash = await dbService.findOne(Wash,query, options);
    if (!foundWash){
      return res.recordNotFound();
    }
    return res.success({ data :foundWash });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Wash.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getWashCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      washSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedWash = await dbService.count(Wash,where);
    return res.success({ data : { count: countedWash } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Wash with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Wash.
 * @return {Object} : updated Wash. {status, message, data}
 */
const updateWash = async (req,res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      washSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedWash = await dbService.updateOne(Wash,query,dataToUpdate);
    if (!updatedWash){
      return res.recordNotFound();
    }
    return res.success({ data :updatedWash });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Wash with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Washs.
 * @return {Object} : updated Washs. {status, message, data}
 */
const bulkUpdateWash = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { ...req.body.data, };
    }
    let updatedWash = await dbService.updateMany(Wash,filter,dataToUpdate);
    if (!updatedWash){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedWash } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Wash with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Wash.
 * @return {obj} : updated Wash. {status, message, data}
 */
const partialUpdateWash = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      washSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedWash = await dbService.updateOne(Wash, query, dataToUpdate);
    if (!updatedWash) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedWash });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Wash from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Wash.
 * @return {Object} : deactivated Wash. {status, message, data}
 */
const softDeleteWash = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedWash = await deleteDependentService.softDeleteWash(query, updateBody);
    if (!updatedWash){
      return res.recordNotFound();
    }
    return res.success({ data:updatedWash });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Wash from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Wash. {status, message, data}
 */
const deleteWash = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedWash;
    if (req.body.isWarning) { 
      deletedWash = await deleteDependentService.countWash(query);
    } else {
      deletedWash = await deleteDependentService.deleteWash(query);
    }
    if (!deletedWash){
      return res.recordNotFound();
    }
    return res.success({ data :deletedWash });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Wash in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyWash = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedWash;
    if (req.body.isWarning) {
      deletedWash = await deleteDependentService.countWash(query);
    }
    else {
      deletedWash = await deleteDependentService.deleteWash(query);
    }
    if (!deletedWash){
      return res.recordNotFound();
    }
    return res.success({ data :deletedWash });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Wash from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Wash.
 * @return {Object} : number of deactivated documents of Wash. {status, message, data}
 */
const softDeleteManyWash = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    let updatedWash = await deleteDependentService.softDeleteWash(query, updateBody);
    if (!updatedWash) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedWash });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addWash,
  bulkInsertWash,
  findAllWash,
  getWash,
  getWashCount,
  updateWash,
  bulkUpdateWash,
  partialUpdateWash,
  softDeleteWash,
  deleteWash,
  deleteManyWash,
  softDeleteManyWash    
};