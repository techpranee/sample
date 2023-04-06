/**
 * complaintValidation.js
 * @description :: validate each post and put request as per complaint model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of complaint */
exports.schemaKeys = joi.object({
  wash: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  owner: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  cleaner: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  isResolved: joi.boolean().default(false),
  resolution: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  hub: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow('')
}).unknown(true);

/** validation keys and properties of complaint for updation */
exports.updateSchemaKeys = joi.object({
  wash: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  owner: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  cleaner: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  isResolved: joi.boolean().default(false),
  resolution: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  hub: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of complaint for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      wash: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      owner: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      cleaner: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      isResolved: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      resolution: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      hub: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
