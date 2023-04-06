/**
 * uploadRoutes.js
 * @description :: routes of upload/download attachment
 */

const express = require('express');
const router = express.Router();
const fileUploadController = require('../../../controller/cleanerapp/v1/fileUploadController');
const auth = require('../../../middleware/auth');
const { PLATFORM } =  require('../../../constants/authConstant'); 

router.post('/cleanerapp/api/v1/upload',auth(PLATFORM.CLEANERAPP),fileUploadController.upload);

router.post('/cleanerapp/api/v1/generate-pre-signed-url',auth(PLATFORM.CLEANERAPP),fileUploadController.generatePreSignedURL);

module.exports = router;