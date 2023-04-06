/**
 * subscriptionController.js
 * @description : exports action methods for subscription.
 */

const Subscription = require('../../model/subscription');
const subscriptionSchemaKey = require('../../utils/validation/subscriptionValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Subscription in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Subscription. {status, message, data}
 */ 
const addSubscription = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      subscriptionSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate = new Subscription(dataToCreate);
    let createdSubscription = await dbService.create(Subscription,dataToCreate);
    return res.success({ data : createdSubscription });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Subscription in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Subscriptions. {status, message, data}
 */
const bulkInsertSubscription = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    let createdSubscriptions = await dbService.create(Subscription,dataToCreate);
    createdSubscriptions = { count: createdSubscriptions ? createdSubscriptions.length : 0 };
    return res.success({ data:{ count:createdSubscriptions.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Subscription from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Subscription(s). {status, message, data}
 */
const findAllSubscription = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      subscriptionSchemaKey.findFilterKeys,
      Subscription.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Subscription, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundSubscriptions = await dbService.paginate( Subscription,query,options);
    if (!foundSubscriptions || !foundSubscriptions.data || !foundSubscriptions.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundSubscriptions });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Subscription from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Subscription. {status, message, data}
 */
const getSubscription = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundSubscription = await dbService.findOne(Subscription,query, options);
    if (!foundSubscription){
      return res.recordNotFound();
    }
    return res.success({ data :foundSubscription });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Subscription.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getSubscriptionCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      subscriptionSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedSubscription = await dbService.count(Subscription,where);
    return res.success({ data : { count: countedSubscription } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Subscription with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Subscription.
 * @return {Object} : updated Subscription. {status, message, data}
 */
const updateSubscription = async (req,res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      subscriptionSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedSubscription = await dbService.updateOne(Subscription,query,dataToUpdate);
    if (!updatedSubscription){
      return res.recordNotFound();
    }
    return res.success({ data :updatedSubscription });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Subscription with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Subscriptions.
 * @return {Object} : updated Subscriptions. {status, message, data}
 */
const bulkUpdateSubscription = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { ...req.body.data, };
    }
    let updatedSubscription = await dbService.updateMany(Subscription,filter,dataToUpdate);
    if (!updatedSubscription){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedSubscription } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Subscription with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Subscription.
 * @return {obj} : updated Subscription. {status, message, data}
 */
const partialUpdateSubscription = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      subscriptionSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedSubscription = await dbService.updateOne(Subscription, query, dataToUpdate);
    if (!updatedSubscription) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedSubscription });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Subscription from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Subscription.
 * @return {Object} : deactivated Subscription. {status, message, data}
 */
const softDeleteSubscription = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedSubscription = await dbService.updateOne(Subscription, query, updateBody);
    if (!updatedSubscription){
      return res.recordNotFound();
    }
    return res.success({ data:updatedSubscription });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Subscription from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Subscription. {status, message, data}
 */
const deleteSubscription = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedSubscription = await dbService.deleteOne(Subscription, query);
    if (!deletedSubscription){
      return res.recordNotFound();
    }
    return res.success({ data :deletedSubscription });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Subscription in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManySubscription = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedSubscription = await dbService.deleteMany(Subscription,query);
    if (!deletedSubscription){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedSubscription } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Subscription from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Subscription.
 * @return {Object} : number of deactivated documents of Subscription. {status, message, data}
 */
const softDeleteManySubscription = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    let updatedSubscription = await dbService.updateMany(Subscription,query, updateBody);
    if (!updatedSubscription) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedSubscription } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addSubscription,
  bulkInsertSubscription,
  findAllSubscription,
  getSubscription,
  getSubscriptionCount,
  updateSubscription,
  bulkUpdateSubscription,
  partialUpdateSubscription,
  softDeleteSubscription,
  deleteSubscription,
  deleteManySubscription,
  softDeleteManySubscription    
};