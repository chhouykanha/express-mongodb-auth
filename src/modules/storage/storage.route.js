const { Router } = require('express');
const {
  deleteFile,
  deleteMultipleFiles,
  uploadFile,
  uploadMultipleFiles,
} = require('./storage.controller');
const { upload } = require('./middleware/multer');

const router = Router();

router.post('/upload', upload.single('file'), uploadFile);
router.post('/upload/multiple', upload.array('files', 10), uploadMultipleFiles);
router.delete('/delete/:key', deleteFile);
router.delete('/delete', deleteMultipleFiles);

module.exports = router;
