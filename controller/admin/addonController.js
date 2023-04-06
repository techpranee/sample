/**
 * addonController.js
 * @description : exports action methods for addon.
 */

const Addon = require('../../model/addon');
const addonSchemaKey = require('../../utils/validation/addonValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Addon in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Addon. {status, message, data}
 */ 
const addAddon = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      addonSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate = new Addon(dataToCreate);
    let createdAddon = await dbService.create(Addon,dataToCreate);
    return res.success({ data : createdAddon });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Addon in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Addons. {status, message, data}
 */
const bulkInsertAddon = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    let createdAddons = await dbService.create(Addon,dataToCreate);
    createdAddons = { count: createdAddons ? createdAddons.length : 0 };
    return res.success({ data:{ count:createdAddons.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Addon from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Addon(s). {status, message, data}
 */
const findAllAddon = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      addonSchemaKey.findFilterKeys,
      Addon.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Addon, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundAddons = await dbService.paginate( Addon,query,options);
    if (!foundAddons || !foundAddons.data || !foundAddons.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundAddons });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Addon from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Addon. {status, message, data}
 */
const getAddon = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundAddon = await dbService.findOne(Addon,query, options);
    if (!foundAddon){
      return res.recordNotFound();
    }
    return res.success({ data :foundAddon });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Addon.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getAddonCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      addonSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedAddon = await dbService.count(Addon,where);
    return res.success({ data : { count: countedAddon } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Addon with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Addon.
 * @return {Object} : updated Addon. {status, message, data}
 */
const updateAddon = async (req,res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      addonSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedAddon = await dbService.updateOne(Addon,query,dataToUpdate);
    if (!updatedAddon){
      return res.recordNotFound();
    }
    return res.success({ data :updatedAddon });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Addon with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Addons.
 * @return {Object} : updated Addons. {status, message, data}
 */
const bulkUpdateAddon = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { ...req.body.data, };
    }
    let updatedAddon = await dbService.updateMany(Addon,filter,dataToUpdate);
    if (!updatedAddon){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedAddon } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Addon with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Addon.
 * @return {obj} : updated Addon. {status, message, data}
 */
const partialUpdateAddon = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      addonSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedAddon = await dbService.updateOne(Addon, query, dataToUpdate);
    if (!updatedAddon) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedAddon });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Addon from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Addon.
 * @return {Object} : deactivated Addon. {status, message, data}
 */
const softDeleteAddon = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedAddon = await dbService.updateOne(Addon, query, updateBody);
    if (!updatedAddon){
      return res.recordNotFound();
    }
    return res.success({ data:updatedAddon });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Addon from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Addon. {status, message, data}
 */
const deleteAddon = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedAddon = await dbService.deleteOne(Addon, query);
    if (!deletedAddon){
      return res.recordNotFound();
    }
    return res.success({ data :deletedAddon });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Addon in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyAddon = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedAddon = await dbService.deleteMany(Addon,query);
    if (!deletedAddon){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedAddon } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Addon from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Addon.
 * @return {Object} : number of deactivated documents of Addon. {status, message, data}
 */
const softDeleteManyAddon = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    let updatedAddon = await dbService.updateMany(Addon,query, updateBody);
    if (!updatedAddon) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedAddon } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addAddon,
  bulkInsertAddon,
  findAllAddon,
  getAddon,
  getAddonCount,
  updateAddon,
  bulkUpdateAddon,
  partialUpdateAddon,
  softDeleteAddon,
  deleteAddon,
  deleteManyAddon,
  softDeleteManyAddon    
};