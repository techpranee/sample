/**
 * notificationValidation.js
 * @description :: validate each post and put request as per notification model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of notification */
exports.schemaKeys = joi.object({
  title: joi.string().allow(null).allow(''),
  uniqueId: joi.string().allow(null).allow(''),
  uniqueIdType: joi.string().allow(null).allow(''),
  message: joi.string().allow(null).allow(''),
  type: joi.string().allow(null).allow(''),
  recieverType: joi.string().allow(null).allow(''),
  user: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  notification_channel: joi.string().allow(null).allow(''),
  data: joi.any(),
  time: joi.date().options({ convert: true }).allow(null).allow(''),
  isSent: joi.boolean(),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of notification for updation */
exports.updateSchemaKeys = joi.object({
  title: joi.string().allow(null).allow(''),
  uniqueId: joi.string().allow(null).allow(''),
  uniqueIdType: joi.string().allow(null).allow(''),
  message: joi.string().allow(null).allow(''),
  type: joi.string().allow(null).allow(''),
  recieverType: joi.string().allow(null).allow(''),
  user: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  notification_channel: joi.string().allow(null).allow(''),
  data: joi.any(),
  time: joi.date().options({ convert: true }).allow(null).allow(''),
  isSent: joi.boolean(),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of notification for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      title: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      uniqueId: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      uniqueIdType: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      message: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      type: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      recieverType: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      user: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      notification_channel: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      data: joi.alternatives().try(joi.array().items(),joi.any(),joi.object()),
      time: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      isSent: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
