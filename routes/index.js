/**
 * index.js
 * @description :: index route of platforms
 */

const express = require('express');
const router =  express.Router();
const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
  windowMs:2 * 60 * 1000,
  max:300,
  message:'Rate limit exceeded, please try again after 2 minutes',
  skip: (req) => {
    if (req.url.includes('/swagger') || req.url.includes('/favicon')) {
      return true;
    } else {
      return false;
    }
  }
});

router.use(rateLimiter,require('./cleanerapp/v1/index'));  
router.use(rateLimiter,require('./userapp/v1/index'));  
router.use(rateLimiter,require('./dashboard/v1/index'));  
router.use(rateLimiter,require('./admin/index'));  
router.use(require('./googleLoginRoutes'));

module.exports = router;