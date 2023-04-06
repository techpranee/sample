/**
 * bannerValidation.js
 * @description :: validate each post and put request as per banner model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of banner */
exports.schemaKeys = joi.object({
  title: joi.string().allow(null).allow(''),
  image_url: joi.string().allow(null).allow(''),
  type: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean()
}).unknown(true);

/** validation keys and properties of banner for updation */
exports.updateSchemaKeys = joi.object({
  title: joi.string().allow(null).allow(''),
  image_url: joi.string().allow(null).allow(''),
  type: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of banner for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      title: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      image_url: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      type: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
