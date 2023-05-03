/**
 * auth.js
 * @description :: routes of authentication APIs
 */

const express =  require('express');
const router  =  express.Router();
const auth = require('../../../middleware/auth');
const authController =  require('../../../controller/cleanerapp/v1/authController');
const { PLATFORM } =  require('../../../constants/authConstant');   

router.route('/register').post(authController.register);
router.post('/send_login_otp',authController.sendOtpForLogin);
router.post('/login_with_otp',authController.loginWithOTP);
router.route('/logout').post(auth(PLATFORM.CLEANERAPP), authController.logout);
router.route('/push-notification/addPlayerId').post(authController.addPlayerId);
router.route('/push-notification/removePlayerId').post(authController.removePlayerId);   
router.get('/login/google',(req,res)=>{
  req.session.platform = 'cleanerapp';
  res.redirect(`http://localhost:${process.env.PORT}/auth/google`);
});       
module.exports = router;