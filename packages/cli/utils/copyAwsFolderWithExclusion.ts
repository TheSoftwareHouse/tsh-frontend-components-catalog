import path from 'path';
import fs from 'fs';
import { ListObjectsV2Output } from '@aws-sdk/client-s3';

import { COMPONENT_ITEMS_BUCKET } from '../shared/constants';

import { getS3Object } from './getS3Object';
import { logger } from './logger';

interface CopyAwsFolderWithExclusionArguments {
  folderPath: string;
  Contents: ListObjectsV2Output['Contents'];
  destinationDirectory: string;
  excludedExtensions: string[];
}

export const copyAwsFolderWithExclusion = async ({
  folderPath,
  Contents,
  destinationDirectory,
  excludedExtensions,
}: CopyAwsFolderWithExclusionArguments) => {
  const dir = path.dirname(destinationDirectory);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!Contents) {
    return;
  }

  try {
    const getContentsByFolderPath = Contents.filter((content) => content.Key?.includes(folderPath));
    for (const object of getContentsByFolderPath) {
      if (excludedExtensions.length && excludedExtensions.some((extension) => object.Key?.endsWith(extension))) {
        continue;
      }

      const getObjectItem = await getS3Object(COMPONENT_ITEMS_BUCKET, object.Key as string);
      const filePath = `${destinationDirectory}/${path.basename(object.Key || '')}`;

      if (!fs.existsSync(destinationDirectory)) {
        fs.mkdirSync(destinationDirectory, { recursive: true });
      }

      if (!fs.existsSync(filePath) && getObjectItem) {
        await fs.writeFileSync(filePath, getObjectItem);
      }
    }
  } catch (error) {
    logger.error("Couldn't find selected component, try again");
  }
};
