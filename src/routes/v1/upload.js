const router = require('express').Router();
const uploadController = require('../../controllers/upload');
const { upload } = require('../../middlewares');

router.post('/', upload.single('images'), uploadController.upload);

module.exports = router;
