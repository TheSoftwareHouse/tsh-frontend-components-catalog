import prompts from 'prompts';
import { ListObjectsV2Output } from '@aws-sdk/client-s3';

import { jsonFileExtenstion, packageVersion, storiesFileExtenstion } from '../shared/constants';
import { promptsMap } from '../shared/prompts';
import { PathList, PromptsNames } from '../types/index';

import { logger } from './logger';
import { generatePath } from './generatePath';
import { copyAwsFolderWithExclusion } from './copyAwsFolderWithExclusion';

type CopyComponentsArguments = {
  componentsDependencies: string[];
  Contents: ListObjectsV2Output['Contents'];
  destinationDirectory: string;
  pathList: PathList;
};

export const copyComponents = async ({
  componentsDependencies,
  Contents,
  pathList,
  destinationDirectory,
}: CopyComponentsArguments) => {
  try {
    for (const name of componentsDependencies) {
      const directoryPath = generatePath({ basePath: `${packageVersion}/`, targetPath: name });
      const isEmpty = !pathList?.includes(directoryPath);

      if (isEmpty) throw Error();

      const { shouldIncludeStories } = await prompts([promptsMap[PromptsNames.ShouldIncludeStories]], {
        onCancel: () => process.exit(0),
      });

      const excludedExtensions = !shouldIncludeStories
        ? [jsonFileExtenstion, storiesFileExtenstion]
        : [jsonFileExtenstion];

      copyAwsFolderWithExclusion({
        Contents,
        folderPath: directoryPath,
        destinationDirectory,
        excludedExtensions,
      });
    }
  } catch (error) {
    logger.error('There is no component to copy');
  }
};
