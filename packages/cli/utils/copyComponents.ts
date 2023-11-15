import prompts from 'prompts';
import { ListObjectsV2Output } from '@aws-sdk/client-s3';

import { jsonFileExtension, packageVersion, storiesFileExtension } from '../shared/constants';
import { promptsMap } from '../shared/prompts';
import { PathList, PromptsNames, SchemaComponent } from '../types/index';

import { logger } from './logger';
import { generatePath } from './generatePath';
import { copyAwsFolderWithExclusion } from './copyAwsFolderWithExclusion';

type CopyComponentsArguments = {
  listOfComponentDependencies: Array<SchemaComponent | undefined>;
  Contents: ListObjectsV2Output['Contents'];
  destinationDirectory: string;
  pathList: PathList;
};

export const copyComponents = async ({
  listOfComponentDependencies,
  Contents,
  pathList,
  destinationDirectory,
}: CopyComponentsArguments) => {
  try {
    for (const component of listOfComponentDependencies) {
      const directoryPath = generatePath({
        basePath: `${packageVersion}/`,
        targetPath: component?.directoryName || '',
      });

      const isEmpty = !pathList?.includes(directoryPath);

      if (isEmpty) throw Error();

      const { shouldIncludeStories } = await prompts([promptsMap[PromptsNames.ShouldIncludeStories](component?.name)], {
        onCancel: () => process.exit(0),
      });

      const excludedExtensions = !shouldIncludeStories
        ? [jsonFileExtension, storiesFileExtension]
        : [jsonFileExtension];

      await copyAwsFolderWithExclusion({
        Contents,
        folderPath: directoryPath,
        destinationDirectory,
        excludedExtensions,
      });
    }
  } catch (error) {
    logger.error('There is no component to copy');
    process.exit(0);
  }
};
