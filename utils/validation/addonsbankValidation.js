/**
 * addonsbankValidation.js
 * @description :: validate each post and put request as per addonsbank model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of addonsbank */
exports.schemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  addonId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  is_schedelued: joi.boolean(),
  purchaseId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  user: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  is_delivered: joi.boolean(),
  delivered_date: joi.date().options({ convert: true }).allow(null).allow('')
}).unknown(true);

/** validation keys and properties of addonsbank for updation */
exports.updateSchemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  addonId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  is_schedelued: joi.boolean(),
  purchaseId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  user: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  is_delivered: joi.boolean(),
  delivered_date: joi.date().options({ convert: true }).allow(null).allow(''),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of addonsbank for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      addonId: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      is_schedelued: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      purchaseId: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      user: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      is_delivered: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      delivered_date: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
