import { NextResponse } from 'next/server';
// pages/api/s3/getFiles.js
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  },
});

export async function GET(req) {
  const bucketName = process.env.AWS_S3_BUCKET_NAME;
  const params = {
    Bucket: bucketName,
    Prefix: '',
  };

  try {
    const data = await s3Client.send(new ListObjectsV2Command(params));
    const files = data.Contents.map((file) => {

      return {
        key: file.Key,
        url: `https://${bucketName}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${file.Key}`,
      };
    });

    return NextResponse.json(files); // Use NextResponse to send a JSON response
  } catch (error) {
    console.error('Error fetching files from S3:', error);
    return NextResponse.json({ error: 'Failed to fetch files from S3' }, { status: 500 });
  }
}

