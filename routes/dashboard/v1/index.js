/**
 * index.js
 * @description :: index route file of dashboard platform.
 */

const express =  require('express');
const router =  express.Router();
router.use('/dashboard/auth',require('./auth'));
router.use(require('./bannerRoutes'));
router.use(require('./walletRoutes'));
router.use(require('./complaintRoutes'));
router.use(require('./addonRoutes'));
router.use(require('./packageRoutes'));
router.use(require('./washRoutes'));
router.use(require('./paymentRoutes'));
router.use(require('./subscriptionRoutes'));
router.use(require('./hubRoutes'));
router.use(require('./cleanerRoutes'));
router.use(require('./carRoutes'));
router.use(require('./userRoutes'));
router.use(require('./uploadRoutes'));

module.exports = router;
