import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { config } from "dotenv";
config();

const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION || "us-east-1",
});

export const uploadFileToS3 = async (file) => {
  const timestamp = Date.now().toString();
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: timestamp + encodeURIComponent(file.originalname),
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const uploadCommand = new PutObjectCommand(params);
    await s3Client.send(uploadCommand);
    const url = `https://${params.Bucket}.s3.${
      process.env.AWS_REGION
    }.amazonaws.com/${encodeURIComponent(params.Key)}`;
    return { url };
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw { error };
  }
};
