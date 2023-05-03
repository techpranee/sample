/**
 * walletValidation.js
 * @description :: validate each post and put request as per wallet model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');
const { convertObjectToEnum } = require('../common');  
const walletDefault = require('../../constants/wallet');    

/** validation keys and properties of wallet */
exports.schemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  month: joi.number().integer().allow(0),
  day: joi.number().integer().allow(0),
  year: joi.number().integer().allow(0),
  user: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  coins: joi.number().integer().allow(0),
  title: joi.string().allow(null).allow(''),
  type: joi.string().allow(null).allow(''),
  tag: joi.string().allow(null).allow(''),
  is_settled: joi.boolean(),
  wash: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow('')
}).unknown(true);

/** validation keys and properties of wallet for updation */
exports.updateSchemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  month: joi.number().integer().allow(0),
  day: joi.number().integer().allow(0),
  year: joi.number().integer().allow(0),
  user: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  coins: joi.number().integer().allow(0),
  title: joi.string().allow(null).allow(''),
  type: joi.string().allow(null).allow(''),
  tag: joi.string().allow(null).allow(''),
  is_settled: joi.boolean(),
  wash: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of wallet for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      month: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      day: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      year: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      user: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      coins: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      title: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      tag: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      is_settled: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      wash: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
