/**
 * notificationController.js
 * @description : exports action methods for notification.
 */

const Notification = require('../../model/notification');
const notificationSchemaKey = require('../../utils/validation/notificationValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Notification in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Notification. {status, message, data}
 */ 
const addNotification = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      notificationSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Notification(dataToCreate);
    let createdNotification = await dbService.create(Notification,dataToCreate);
    return res.success({ data : createdNotification });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Notification in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Notifications. {status, message, data}
 */
const bulkInsertNotification = async (req,res)=>{
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
    let createdNotifications = await dbService.create(Notification,dataToCreate);
    createdNotifications = { count: createdNotifications ? createdNotifications.length : 0 };
    return res.success({ data:{ count:createdNotifications.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Notification from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Notification(s). {status, message, data}
 */
const findAllNotification = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      notificationSchemaKey.findFilterKeys,
      Notification.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Notification, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundNotifications = await dbService.paginate( Notification,query,options);
    if (!foundNotifications || !foundNotifications.data || !foundNotifications.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundNotifications });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Notification from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Notification. {status, message, data}
 */
const getNotification = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundNotification = await dbService.findOne(Notification,query, options);
    if (!foundNotification){
      return res.recordNotFound();
    }
    return res.success({ data :foundNotification });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Notification.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getNotificationCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      notificationSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedNotification = await dbService.count(Notification,where);
    return res.success({ data : { count: countedNotification } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Notification with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Notification.
 * @return {Object} : updated Notification. {status, message, data}
 */
const updateNotification = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      notificationSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedNotification = await dbService.updateOne(Notification,query,dataToUpdate);
    if (!updatedNotification){
      return res.recordNotFound();
    }
    return res.success({ data :updatedNotification });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Notification with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Notifications.
 * @return {Object} : updated Notifications. {status, message, data}
 */
const bulkUpdateNotification = async (req,res)=>{
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
    let updatedNotification = await dbService.updateMany(Notification,filter,dataToUpdate);
    if (!updatedNotification){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedNotification } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Notification with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Notification.
 * @return {obj} : updated Notification. {status, message, data}
 */
const partialUpdateNotification = async (req,res) => {
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
      notificationSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedNotification = await dbService.updateOne(Notification, query, dataToUpdate);
    if (!updatedNotification) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedNotification });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Notification from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Notification.
 * @return {Object} : deactivated Notification. {status, message, data}
 */
const softDeleteNotification = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedNotification = await dbService.updateOne(Notification, query, updateBody);
    if (!updatedNotification){
      return res.recordNotFound();
    }
    return res.success({ data:updatedNotification });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Notification from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Notification. {status, message, data}
 */
const deleteNotification = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedNotification = await dbService.deleteOne(Notification, query);
    if (!deletedNotification){
      return res.recordNotFound();
    }
    return res.success({ data :deletedNotification });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Notification in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyNotification = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedNotification = await dbService.deleteMany(Notification,query);
    if (!deletedNotification){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedNotification } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Notification from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Notification.
 * @return {Object} : number of deactivated documents of Notification. {status, message, data}
 */
const softDeleteManyNotification = async (req,res) => {
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
    let updatedNotification = await dbService.updateMany(Notification,query, updateBody);
    if (!updatedNotification) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedNotification } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addNotification,
  bulkInsertNotification,
  findAllNotification,
  getNotification,
  getNotificationCount,
  updateNotification,
  bulkUpdateNotification,
  partialUpdateNotification,
  softDeleteNotification,
  deleteNotification,
  deleteManyNotification,
  softDeleteManyNotification    
};