/**
 * uploadRoutes.js
 * @description :: routes of upload/download attachment
 */

const express = require('express');
const router = express.Router();
const fileUploadController = require('../../../controller/dashboard/v1/fileUploadController');
const auth = require('../../../middleware/auth');
const { PLATFORM } =  require('../../../constants/authConstant'); 

router.post('/dashboard/api/v1/upload',auth(PLATFORM.DASHBOARD),fileUploadController.upload);

router.post('/dashboard/api/v1/generate-pre-signed-url',auth(PLATFORM.DASHBOARD),fileUploadController.generatePreSignedURL);

module.exports = router;