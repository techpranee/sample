/**
 * loginUser.js
 * @description :: middleware that verifies JWT token of user
 */

const jwt = require('jsonwebtoken');
const { PLATFORM } = require('../constants/authConstant');
const userappSecret = require('../constants/authConstant').JWT.USERAPP_SECRET;
const adminSecret = require('../constants/authConstant').JWT.ADMIN_SECRET;
const cleanerappSecret = require('../constants/authConstant').JWT.CLEANERAPP_SECRET;
const dashboardSecret = require('../constants/authConstant').JWT.DASHBOARD_SECRET;

/**
 * @description : middleware for authenticate user with JWT token
 * @param {Object} req : request of route.
 * @param {Object} res : response of route.
 * @param {callback} next : executes the next middleware succeeding the current middleware.
 */
const authenticateJWT = (platform) => async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    let secret = '';
    if (platform == PLATFORM.USERAPP){
      secret = userappSecret;
    }
    else if (platform == PLATFORM.ADMIN){
      secret = adminSecret;
    }
    else if (platform == PLATFORM.CLEANERAPP){
      secret = cleanerappSecret;
    }
    else if (platform == PLATFORM.DASHBOARD){
      secret = dashboardSecret;
    }
    jwt.verify(token,secret, (error, user) => {
      if (error) {
        return res.unAuthorized();
      }
      req.user = user;
      next();
    });
  } else {
    return res.unAuthorized();
  }
};
module.exports = authenticateJWT;