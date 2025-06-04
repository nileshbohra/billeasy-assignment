const express = require('express');
const { uploadFile, getFileById } = require('../controllers/filesController');
const router = express.Router();
const uploadMiddleware = require('../middlewares/uploadMiddleware');

router.post('/upload', uploadMiddleware.single('file'), uploadFile);
router.get('/:id', getFileById);

module.exports = router;