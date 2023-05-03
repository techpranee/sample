/**
 * purchaseValidation.js
 * @description :: validate each post and put request as per purchase model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of purchase */
exports.schemaKeys = joi.object({
  paymentId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  purchase_date: joi.date().options({ convert: true }).allow(null).allow(''),
  totalPurchaseValue: joi.number().integer().allow(0),
  user: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  items: joi.array().items(),
  isDeleted: joi.boolean()
}).unknown(true);

/** validation keys and properties of purchase for updation */
exports.updateSchemaKeys = joi.object({
  paymentId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  purchase_date: joi.date().options({ convert: true }).allow(null).allow(''),
  totalPurchaseValue: joi.number().integer().allow(0),
  user: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  items: joi.array().items(),
  isDeleted: joi.boolean(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of purchase for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      paymentId: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      purchase_date: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      totalPurchaseValue: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      user: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      items: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
