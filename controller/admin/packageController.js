/**
 * packageController.js
 * @description : exports action methods for package.
 */

const Package = require('../../model/package');
const packageSchemaKey = require('../../utils/validation/packageValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');
   
/**
 * @description : create document of Package in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Package. {status, message, data}
 */ 
const addPackage = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      packageSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate = new Package(dataToCreate);
    let createdPackage = await dbService.create(Package,dataToCreate);
    return res.success({ data : createdPackage });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Package in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Packages. {status, message, data}
 */
const bulkInsertPackage = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    let createdPackages = await dbService.create(Package,dataToCreate);
    createdPackages = { count: createdPackages ? createdPackages.length : 0 };
    return res.success({ data:{ count:createdPackages.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Package from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Package(s). {status, message, data}
 */
const findAllPackage = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      packageSchemaKey.findFilterKeys,
      Package.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Package, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundPackages = await dbService.paginate( Package,query,options);
    if (!foundPackages || !foundPackages.data || !foundPackages.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundPackages });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Package from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Package. {status, message, data}
 */
const getPackage = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundPackage = await dbService.findOne(Package,query, options);
    if (!foundPackage){
      return res.recordNotFound();
    }
    return res.success({ data :foundPackage });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Package.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getPackageCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      packageSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedPackage = await dbService.count(Package,where);
    return res.success({ data : { count: countedPackage } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Package with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Package.
 * @return {Object} : updated Package. {status, message, data}
 */
const updatePackage = async (req,res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      packageSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedPackage = await dbService.updateOne(Package,query,dataToUpdate);
    if (!updatedPackage){
      return res.recordNotFound();
    }
    return res.success({ data :updatedPackage });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Package with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Packages.
 * @return {Object} : updated Packages. {status, message, data}
 */
const bulkUpdatePackage = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { ...req.body.data, };
    }
    let updatedPackage = await dbService.updateMany(Package,filter,dataToUpdate);
    if (!updatedPackage){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedPackage } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Package with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Package.
 * @return {obj} : updated Package. {status, message, data}
 */
const partialUpdatePackage = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      packageSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedPackage = await dbService.updateOne(Package, query, dataToUpdate);
    if (!updatedPackage) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedPackage });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Package from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Package.
 * @return {Object} : deactivated Package. {status, message, data}
 */
const softDeletePackage = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedPackage = await deleteDependentService.softDeletePackage(query, updateBody);
    if (!updatedPackage){
      return res.recordNotFound();
    }
    return res.success({ data:updatedPackage });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Package from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Package. {status, message, data}
 */
const deletePackage = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedPackage;
    if (req.body.isWarning) { 
      deletedPackage = await deleteDependentService.countPackage(query);
    } else {
      deletedPackage = await deleteDependentService.deletePackage(query);
    }
    if (!deletedPackage){
      return res.recordNotFound();
    }
    return res.success({ data :deletedPackage });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Package in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyPackage = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedPackage;
    if (req.body.isWarning) {
      deletedPackage = await deleteDependentService.countPackage(query);
    }
    else {
      deletedPackage = await deleteDependentService.deletePackage(query);
    }
    if (!deletedPackage){
      return res.recordNotFound();
    }
    return res.success({ data :deletedPackage });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Package from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Package.
 * @return {Object} : number of deactivated documents of Package. {status, message, data}
 */
const softDeleteManyPackage = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    let updatedPackage = await deleteDependentService.softDeletePackage(query, updateBody);
    if (!updatedPackage) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedPackage });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addPackage,
  bulkInsertPackage,
  findAllPackage,
  getPackage,
  getPackageCount,
  updatePackage,
  bulkUpdatePackage,
  partialUpdatePackage,
  softDeletePackage,
  deletePackage,
  deleteManyPackage,
  softDeleteManyPackage    
};