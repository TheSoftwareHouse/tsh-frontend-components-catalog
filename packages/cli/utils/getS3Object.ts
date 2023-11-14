import { GetObjectCommand } from '@aws-sdk/client-s3';

import { client } from './s3Client';

export async function getS3Object(Bucket: string, Key: string) {
  const getObjectCommand = new GetObjectCommand({
    Bucket,
    Key,
  });

  try {
    const response = await client.send(getObjectCommand);
    const bodyString = await response.Body?.transformToString();
    return bodyString;
  } catch (error) {
    throw Error(error as string);
  }
}
