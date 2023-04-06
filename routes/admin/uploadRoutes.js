/**
 * uploadRoutes.js
 * @description :: routes of upload/download attachment
 */

const express = require('express');
const router = express.Router();
const fileUploadController = require('../../controller/admin/fileUploadController');
const auth = require('../../middleware/auth');
const { PLATFORM } =  require('../../constants/authConstant'); 

router.post('/admin/upload',auth(PLATFORM.ADMIN),fileUploadController.upload);

router.post('/admin/generate-pre-signed-url',auth(PLATFORM.ADMIN),fileUploadController.generatePreSignedURL);

module.exports = router;