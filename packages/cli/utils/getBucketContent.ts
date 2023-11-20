import { ListObjectsV2Command, _Object } from '@aws-sdk/client-s3';
import path from 'path';

import { COMPONENT_ITEMS_BUCKET, EXCLUDED_BASE_S3_PATHS } from '../shared/constants';
import { PathList } from '../types';

import { logger } from './logger';
import { client } from './s3Client';

export const getBucketContent = async (): Promise<{
  pathList?: PathList;
  Contents?: _Object[];
}> => {
  const command = new ListObjectsV2Command({
    Bucket: COMPONENT_ITEMS_BUCKET,
  });

  try {
    const { Contents } = await client.send(command);
    const contentsList = Contents?.map((content) => {
      if (!content?.Key || EXCLUDED_BASE_S3_PATHS.includes(content?.Key)) {
        return;
      }

      const pathDirName = path.dirname(content.Key || '');
      const baseFolderName = pathDirName.split(path.sep).slice(0, 2).join(path.sep);

      return baseFolderName;
    }).filter(Boolean);

    const pathList = [...new Set(contentsList)];

    return {
      pathList,
      Contents,
    };
  } catch (error) {
    logger.error("Couldn't get access to S3 bucket, please try again");
    throw Error();
  }
};
