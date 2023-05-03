/**
 * washValidation.js
 * @description :: validate each post and put request as per wash model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of wash */
exports.schemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  carId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  cleanerId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  hub: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  cleanType: joi.string().allow(null).allow(''),
  before: joi.array().items(),
  after: joi.array().items(),
  feedback: joi.string().allow(null).allow(''),
  rating: joi.number().integer().allow(0),
  complaint_id: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow('')
}).unknown(true);

/** validation keys and properties of wash for updation */
exports.updateSchemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  carId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  cleanerId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  hub: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  cleanType: joi.string().allow(null).allow(''),
  before: joi.array().items(),
  after: joi.array().items(),
  feedback: joi.string().allow(null).allow(''),
  rating: joi.number().integer().allow(0),
  complaint_id: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of wash for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      carId: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      cleanerId: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      hub: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      cleanType: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      before: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      after: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      feedback: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      rating: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      complaint_id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
