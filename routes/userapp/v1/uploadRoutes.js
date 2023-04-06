/**
 * uploadRoutes.js
 * @description :: routes of upload/download attachment
 */

const express = require('express');
const router = express.Router();
const fileUploadController = require('../../../controller/userapp/v1/fileUploadController');
const auth = require('../../../middleware/auth');
const { PLATFORM } =  require('../../../constants/authConstant'); 

router.post('/userapp/api/v1/upload',auth(PLATFORM.USERAPP),fileUploadController.upload);

router.post('/userapp/api/v1/generate-pre-signed-url',auth(PLATFORM.USERAPP),fileUploadController.generatePreSignedURL);

module.exports = router;