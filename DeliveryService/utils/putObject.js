const { PutObjectCommand } = require('@aws-sdk/client-s3');
const { s3Client } = require('../utils/s3-credentials'); 

exports.putObject = async (file, fileName) => {
  try {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: fileName,
      Body: file,
      ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(params);
    const data = await s3Client.send(command);

    if (data.$metadata.httpStatusCode === 200) {
      const url = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
      return { url, key: fileName }; 
    } else {
      throw new Error("S3 upload failed");
    }

  } catch (error) {
    console.error("Error uploading file: ", error);
    throw error;
  }
};