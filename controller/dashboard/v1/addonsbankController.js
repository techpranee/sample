/**
 * addonsbankController.js
 * @description : exports action methods for addonsbank.
 */

const Addonsbank = require('../../../model/addonsbank');
const addonsbankSchemaKey = require('../../../utils/validation/addonsbankValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Addonsbank in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Addonsbank. {status, message, data}
 */ 
const addAddonsbank = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      addonsbankSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Addonsbank(dataToCreate);
    let createdAddonsbank = await dbService.create(Addonsbank,dataToCreate);
    return res.success({ data : createdAddonsbank });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Addonsbank in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Addonsbanks. {status, message, data}
 */
const bulkInsertAddonsbank = async (req,res)=>{
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
    let createdAddonsbanks = await dbService.create(Addonsbank,dataToCreate);
    createdAddonsbanks = { count: createdAddonsbanks ? createdAddonsbanks.length : 0 };
    return res.success({ data:{ count:createdAddonsbanks.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Addonsbank from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Addonsbank(s). {status, message, data}
 */
const findAllAddonsbank = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      addonsbankSchemaKey.findFilterKeys,
      Addonsbank.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Addonsbank, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundAddonsbanks = await dbService.paginate( Addonsbank,query,options);
    if (!foundAddonsbanks || !foundAddonsbanks.data || !foundAddonsbanks.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundAddonsbanks });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Addonsbank from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Addonsbank. {status, message, data}
 */
const getAddonsbank = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundAddonsbank = await dbService.findOne(Addonsbank,query, options);
    if (!foundAddonsbank){
      return res.recordNotFound();
    }
    return res.success({ data :foundAddonsbank });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Addonsbank.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getAddonsbankCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      addonsbankSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedAddonsbank = await dbService.count(Addonsbank,where);
    return res.success({ data : { count: countedAddonsbank } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Addonsbank with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Addonsbank.
 * @return {Object} : updated Addonsbank. {status, message, data}
 */
const updateAddonsbank = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      addonsbankSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedAddonsbank = await dbService.updateOne(Addonsbank,query,dataToUpdate);
    if (!updatedAddonsbank){
      return res.recordNotFound();
    }
    return res.success({ data :updatedAddonsbank });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Addonsbank with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Addonsbanks.
 * @return {Object} : updated Addonsbanks. {status, message, data}
 */
const bulkUpdateAddonsbank = async (req,res)=>{
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
    let updatedAddonsbank = await dbService.updateMany(Addonsbank,filter,dataToUpdate);
    if (!updatedAddonsbank){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedAddonsbank } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Addonsbank with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Addonsbank.
 * @return {obj} : updated Addonsbank. {status, message, data}
 */
const partialUpdateAddonsbank = async (req,res) => {
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
      addonsbankSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedAddonsbank = await dbService.updateOne(Addonsbank, query, dataToUpdate);
    if (!updatedAddonsbank) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedAddonsbank });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Addonsbank from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Addonsbank.
 * @return {Object} : deactivated Addonsbank. {status, message, data}
 */
const softDeleteAddonsbank = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedAddonsbank = await dbService.updateOne(Addonsbank, query, updateBody);
    if (!updatedAddonsbank){
      return res.recordNotFound();
    }
    return res.success({ data:updatedAddonsbank });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Addonsbank from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Addonsbank. {status, message, data}
 */
const deleteAddonsbank = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedAddonsbank = await dbService.deleteOne(Addonsbank, query);
    if (!deletedAddonsbank){
      return res.recordNotFound();
    }
    return res.success({ data :deletedAddonsbank });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Addonsbank in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyAddonsbank = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedAddonsbank = await dbService.deleteMany(Addonsbank,query);
    if (!deletedAddonsbank){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedAddonsbank } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Addonsbank from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Addonsbank.
 * @return {Object} : number of deactivated documents of Addonsbank. {status, message, data}
 */
const softDeleteManyAddonsbank = async (req,res) => {
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
    let updatedAddonsbank = await dbService.updateMany(Addonsbank,query, updateBody);
    if (!updatedAddonsbank) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedAddonsbank } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addAddonsbank,
  bulkInsertAddonsbank,
  findAllAddonsbank,
  getAddonsbank,
  getAddonsbankCount,
  updateAddonsbank,
  bulkUpdateAddonsbank,
  partialUpdateAddonsbank,
  softDeleteAddonsbank,
  deleteAddonsbank,
  deleteManyAddonsbank,
  softDeleteManyAddonsbank    
};