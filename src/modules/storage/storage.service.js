const {
  DeleteObjectCommand,
  DeleteObjectsCommand,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");
const path = require("path");
const { randomUUID } = require("crypto");
const { config } = require("../../config/env");
const { s3 } = require("./config/s3.config");

const sanitizeFilename = (filename) => filename.replace(/[^a-zA-Z0-9._-]/g, "-");
const buildStorageKey = (file) => {
  const extension = path.extname(file.originalname || "");
  const baseName = path.basename(file.originalname || "file", extension);
  const safeFileName = sanitizeFilename(baseName) || "file";

  return `${Date.now()}-${randomUUID()}-${safeFileName}${extension}`;
};


const uploadBufferToStorage = async ({ key, body, contentType, contentDisposition }) => {
  await s3.send(
    new PutObjectCommand({
      Bucket: config.r2.bucketName,
      Key: key,
      Body: body,
      ContentType: contentType,
      ContentDisposition: contentDisposition,
    })
  );

  return {
    key,
    url: `${config.r2.publicUrl.replace(/\/+$/, "")}/${key}`,
  };
};

const uploadSingleFile = async (file, folder) => {
  const key = buildStorageKey(file, folder);
  const uploadedFile = await uploadBufferToStorage({
    key,
    body: file.buffer,
    contentType: file.mimetype,
    contentDisposition: `inline; filename="${sanitizeFilename(file.originalname || "file")}"`,
  });

  return {
    key: uploadedFile.key,
    url: uploadedFile.url,
    name: file.originalname,
    size: file.size,
    mimeType: file.mimetype,
  };
};

const uploadMultipleFiles = async (files, folder) => {
  return Promise.all(files.map((file) => uploadSingleFile(file, folder)));
};

const removeFileFromStorage = async (key) => {
  await s3.send(
    new DeleteObjectCommand({
      Bucket: config.r2.bucketName,
      Key: key,
    })
  );
};

const removeFilesFromStorage = async (keys) => {
  await s3.send(
    new DeleteObjectsCommand({
      Bucket: config.r2.bucketName,
      Delete: {
        Objects: keys.map((key) => ({ Key: key })),
        Quiet: false,
      },
    })
  );
};

exports.uploadSingleFile = uploadSingleFile;
exports.uploadMultipleFiles = uploadMultipleFiles;
exports.removeFileFromStorage = removeFileFromStorage;
exports.removeFilesFromStorage = removeFilesFromStorage;
