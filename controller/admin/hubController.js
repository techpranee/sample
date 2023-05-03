/**
 * hubController.js
 * @description : exports action methods for hub.
 */

const Hub = require('../../model/hub');
const hubSchemaKey = require('../../utils/validation/hubValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');
   
/**
 * @description : create document of Hub in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Hub. {status, message, data}
 */ 
const addHub = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      hubSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Hub(dataToCreate);
    let createdHub = await dbService.create(Hub,dataToCreate);
    return res.success({ data : createdHub });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Hub in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Hubs. {status, message, data}
 */
const bulkInsertHub = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    for (let i = 0;i < dataToCreate.length;i++){
      dataToCreate[i] = {
        ...dataToCreate[i],
        addedBy: req.user.id
      };
    }
    let createdHubs = await dbService.create(Hub,dataToCreate);
    createdHubs = { count: createdHubs ? createdHubs.length : 0 };
    return res.success({ data:{ count:createdHubs.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Hub from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Hub(s). {status, message, data}
 */
const findAllHub = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      hubSchemaKey.findFilterKeys,
      Hub.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Hub, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundHubs = await dbService.paginate( Hub,query,options);
    if (!foundHubs || !foundHubs.data || !foundHubs.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundHubs });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Hub from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Hub. {status, message, data}
 */
const getHub = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundHub = await dbService.findOne(Hub,query, options);
    if (!foundHub){
      return res.recordNotFound();
    }
    return res.success({ data :foundHub });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Hub.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getHubCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      hubSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedHub = await dbService.count(Hub,where);
    return res.success({ data : { count: countedHub } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Hub with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Hub.
 * @return {Object} : updated Hub. {status, message, data}
 */
const updateHub = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      hubSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedHub = await dbService.updateOne(Hub,query,dataToUpdate);
    if (!updatedHub){
      return res.recordNotFound();
    }
    return res.success({ data :updatedHub });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Hub with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Hubs.
 * @return {Object} : updated Hubs. {status, message, data}
 */
const bulkUpdateHub = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    delete dataToUpdate['addedBy'];
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { 
        ...req.body.data,
        updatedBy : req.user.id
      };
    }
    let updatedHub = await dbService.updateMany(Hub,filter,dataToUpdate);
    if (!updatedHub){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedHub } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Hub with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Hub.
 * @return {obj} : updated Hub. {status, message, data}
 */
const partialUpdateHub = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    delete req.body['addedBy'];
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      hubSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedHub = await dbService.updateOne(Hub, query, dataToUpdate);
    if (!updatedHub) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedHub });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Hub from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Hub.
 * @return {Object} : deactivated Hub. {status, message, data}
 */
const softDeleteHub = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedHub = await deleteDependentService.softDeleteHub(query, updateBody);
    if (!updatedHub){
      return res.recordNotFound();
    }
    return res.success({ data:updatedHub });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Hub from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Hub. {status, message, data}
 */
const deleteHub = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedHub;
    if (req.body.isWarning) { 
      deletedHub = await deleteDependentService.countHub(query);
    } else {
      deletedHub = await deleteDependentService.deleteHub(query);
    }
    if (!deletedHub){
      return res.recordNotFound();
    }
    return res.success({ data :deletedHub });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Hub in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyHub = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedHub;
    if (req.body.isWarning) {
      deletedHub = await deleteDependentService.countHub(query);
    }
    else {
      deletedHub = await deleteDependentService.deleteHub(query);
    }
    if (!deletedHub){
      return res.recordNotFound();
    }
    return res.success({ data :deletedHub });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Hub from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Hub.
 * @return {Object} : number of deactivated documents of Hub. {status, message, data}
 */
const softDeleteManyHub = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedHub = await deleteDependentService.softDeleteHub(query, updateBody);
    if (!updatedHub) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedHub });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addHub,
  bulkInsertHub,
  findAllHub,
  getHub,
  getHubCount,
  updateHub,
  bulkUpdateHub,
  partialUpdateHub,
  softDeleteHub,
  deleteHub,
  deleteManyHub,
  softDeleteManyHub    
};