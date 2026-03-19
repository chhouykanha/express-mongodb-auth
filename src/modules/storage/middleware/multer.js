const multer = require('multer');
const { config } = require('../../../config/env');
const storage = multer.memoryStorage();

const allowedMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'application/pdf',
];

const fileFilter = (req, file, cb) => {
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error('Unsupported file type'));
  }

  cb(null, true);
};

exports.upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: Number(config.maxFileSize || 10 * 1024 * 1024),
    files: 10,
  },
});
