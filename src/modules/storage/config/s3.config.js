const { S3Client } = require("@aws-sdk/client-s3");
const { config } = require("../../../config/env");

const s3 = new S3Client({
  region: config.r2.region,
  endpoint: config.r2.endpoint,
  credentials: {
    accessKeyId: config.r2.accessKeyId,
    secretAccessKey: config.r2.secretAccessKey,
  },
});

exports.s3 = s3;
