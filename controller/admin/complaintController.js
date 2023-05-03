/**
 * complaintController.js
 * @description : exports action methods for complaint.
 */

const Complaint = require('../../model/complaint');
const complaintSchemaKey = require('../../utils/validation/complaintValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');
   
/**
 * @description : create document of Complaint in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Complaint. {status, message, data}
 */ 
const addComplaint = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      complaintSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate = new Complaint(dataToCreate);
    let createdComplaint = await dbService.create(Complaint,dataToCreate);
    return res.success({ data : createdComplaint });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Complaint in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Complaints. {status, message, data}
 */
const bulkInsertComplaint = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    let createdComplaints = await dbService.create(Complaint,dataToCreate);
    createdComplaints = { count: createdComplaints ? createdComplaints.length : 0 };
    return res.success({ data:{ count:createdComplaints.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Complaint from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Complaint(s). {status, message, data}
 */
const findAllComplaint = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      complaintSchemaKey.findFilterKeys,
      Complaint.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Complaint, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundComplaints = await dbService.paginate( Complaint,query,options);
    if (!foundComplaints || !foundComplaints.data || !foundComplaints.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundComplaints });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Complaint from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Complaint. {status, message, data}
 */
const getComplaint = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundComplaint = await dbService.findOne(Complaint,query, options);
    if (!foundComplaint){
      return res.recordNotFound();
    }
    return res.success({ data :foundComplaint });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Complaint.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getComplaintCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      complaintSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedComplaint = await dbService.count(Complaint,where);
    return res.success({ data : { count: countedComplaint } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Complaint with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Complaint.
 * @return {Object} : updated Complaint. {status, message, data}
 */
const updateComplaint = async (req,res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      complaintSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedComplaint = await dbService.updateOne(Complaint,query,dataToUpdate);
    if (!updatedComplaint){
      return res.recordNotFound();
    }
    return res.success({ data :updatedComplaint });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Complaint with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Complaints.
 * @return {Object} : updated Complaints. {status, message, data}
 */
const bulkUpdateComplaint = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { ...req.body.data, };
    }
    let updatedComplaint = await dbService.updateMany(Complaint,filter,dataToUpdate);
    if (!updatedComplaint){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedComplaint } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Complaint with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Complaint.
 * @return {obj} : updated Complaint. {status, message, data}
 */
const partialUpdateComplaint = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      complaintSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedComplaint = await dbService.updateOne(Complaint, query, dataToUpdate);
    if (!updatedComplaint) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedComplaint });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Complaint from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Complaint.
 * @return {Object} : deactivated Complaint. {status, message, data}
 */
const softDeleteComplaint = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedComplaint = await deleteDependentService.softDeleteComplaint(query, updateBody);
    if (!updatedComplaint){
      return res.recordNotFound();
    }
    return res.success({ data:updatedComplaint });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Complaint from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Complaint. {status, message, data}
 */
const deleteComplaint = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedComplaint;
    if (req.body.isWarning) { 
      deletedComplaint = await deleteDependentService.countComplaint(query);
    } else {
      deletedComplaint = await deleteDependentService.deleteComplaint(query);
    }
    if (!deletedComplaint){
      return res.recordNotFound();
    }
    return res.success({ data :deletedComplaint });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Complaint in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyComplaint = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedComplaint;
    if (req.body.isWarning) {
      deletedComplaint = await deleteDependentService.countComplaint(query);
    }
    else {
      deletedComplaint = await deleteDependentService.deleteComplaint(query);
    }
    if (!deletedComplaint){
      return res.recordNotFound();
    }
    return res.success({ data :deletedComplaint });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Complaint from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Complaint.
 * @return {Object} : number of deactivated documents of Complaint. {status, message, data}
 */
const softDeleteManyComplaint = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    let updatedComplaint = await deleteDependentService.softDeleteComplaint(query, updateBody);
    if (!updatedComplaint) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedComplaint });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addComplaint,
  bulkInsertComplaint,
  findAllComplaint,
  getComplaint,
  getComplaintCount,
  updateComplaint,
  bulkUpdateComplaint,
  partialUpdateComplaint,
  softDeleteComplaint,
  deleteComplaint,
  deleteManyComplaint,
  softDeleteManyComplaint    
};