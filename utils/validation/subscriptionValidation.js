/**
 * subscriptionValidation.js
 * @description :: validate each post and put request as per subscription model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of subscription */
exports.schemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  validFrom: joi.date().options({ convert: true }).allow(null).allow(''),
  validTill: joi.date().options({ convert: true }).allow(null).allow(''),
  totalPayment: joi.number().integer().allow(0),
  user: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  hub: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  car: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  status: joi.string().allow(null).allow(''),
  addons: joi.array().items(joi.object()),
  package: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  completion: joi.number().min(0).max(100).allow(0),
  paymentId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow('')
}).unknown(true);

/** validation keys and properties of subscription for updation */
exports.updateSchemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  validFrom: joi.date().options({ convert: true }).allow(null).allow(''),
  validTill: joi.date().options({ convert: true }).allow(null).allow(''),
  totalPayment: joi.number().integer().allow(0),
  user: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  hub: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  car: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  status: joi.string().allow(null).allow(''),
  addons: joi.array().items(joi.object()),
  package: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  completion: joi.number().min(0).max(100).allow(0),
  paymentId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of subscription for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      validFrom: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      validTill: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      totalPayment: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      user: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      hub: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      car: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      status: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      package: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      completion: joi.alternatives().try(joi.array().items(),joi.number().min(0).max(100),joi.object()),
      paymentId: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
