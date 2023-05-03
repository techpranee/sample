/**
 * authConstant.js
 * @description :: constants used in authentication
 */

const JWT = {
  USERAPP_SECRET:'myjwtuserappsecret',
  ADMIN_SECRET:'myjwtadminsecret',
  CLEANERAPP_SECRET:'myjwtcleanerappsecret',
  DASHBOARD_SECRET:'myjwtdashboardsecret',
  EXPIRES_IN: 10000
};

const USER_TYPES = {
  User:1,
  Admin:2,
  Cleaner:3,
  Hub:4,
};

const PLATFORM = {
  USERAPP:1,
  ADMIN:2,
  CLEANERAPP:3,
  DASHBOARD:4,
};

let LOGIN_ACCESS = {
  [USER_TYPES.User]:[PLATFORM.USERAPP],        
  [USER_TYPES.Admin]:[PLATFORM.ADMIN],        
  [USER_TYPES.Cleaner]:[PLATFORM.CLEANERAPP],        
  [USER_TYPES.Hub]:[PLATFORM.DASHBOARD],        
};

const DEFAULT_USER_ROLE = 'Hub';

const MAX_LOGIN_RETRY_LIMIT = 3;
const LOGIN_REACTIVE_TIME = 5;   

const SEND_LOGIN_OTP = { SMS:1, };
const DEFAULT_SEND_LOGIN_OTP = SEND_LOGIN_OTP.SMS;

const FORGOT_PASSWORD_WITH = {
  LINK: {
    sms: true,
    email: false
  },
  EXPIRE_TIME: 10
};

module.exports = {
  JWT,
  USER_TYPES,
  PLATFORM,
  MAX_LOGIN_RETRY_LIMIT,
  LOGIN_REACTIVE_TIME,
  SEND_LOGIN_OTP,
  DEFAULT_SEND_LOGIN_OTP,
  FORGOT_PASSWORD_WITH,
  LOGIN_ACCESS,
  DEFAULT_USER_ROLE,
};