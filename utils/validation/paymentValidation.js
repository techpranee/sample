/**
 * paymentValidation.js
 * @description :: validate each post and put request as per payment model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of payment */
exports.schemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  createdAt: joi.date().options({ convert: true }).allow(null).allow(''),
  updatedAt: joi.date().options({ convert: true }).allow(null).allow(''),
  addedBy: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  updatedBy: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  amount: joi.number().integer().allow(0),
  paymentChannel: joi.string().allow(null).allow(''),
  refId: joi.string().allow(null).allow(''),
  data: joi.any()
}).unknown(true);

/** validation keys and properties of payment for updation */
exports.updateSchemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  createdAt: joi.date().options({ convert: true }).allow(null).allow(''),
  updatedAt: joi.date().options({ convert: true }).allow(null).allow(''),
  addedBy: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  updatedBy: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  amount: joi.number().integer().allow(0),
  paymentChannel: joi.string().allow(null).allow(''),
  refId: joi.string().allow(null).allow(''),
  data: joi.any(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of payment for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      createdAt: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      updatedAt: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      addedBy: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      updatedBy: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      amount: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      paymentChannel: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      refId: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      data: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
