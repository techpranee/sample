/**
 * hubValidation.js
 * @description :: validate each post and put request as per hub model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of hub */
exports.schemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  is_individual: joi.boolean(),
  Name: joi.string().allow(null).allow(''),
  zipcode: joi.number().integer().allow(0),
  allowed_region_codes: joi.array().items(joi.object()),
  contractValidTill: joi.date().options({ convert: true }).allow(null).allow(''),
  owner: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  managers: joi.object({ id:joi.string() })
}).unknown(true);

/** validation keys and properties of hub for updation */
exports.updateSchemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  is_individual: joi.boolean(),
  Name: joi.string().allow(null).allow(''),
  zipcode: joi.number().integer().allow(0),
  allowed_region_codes: joi.array().items(joi.object()),
  contractValidTill: joi.date().options({ convert: true }).allow(null).allow(''),
  owner: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  managers: joi.object({ id:joi.string() }),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of hub for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      is_individual: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      Name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      zipcode: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      contractValidTill: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      owner: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      managers: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
