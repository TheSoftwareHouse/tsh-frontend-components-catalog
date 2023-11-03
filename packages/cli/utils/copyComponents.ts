import prompts from 'prompts';
import path from 'path';

import { componentsDirectoryPath, jsonFileExtenstion, storiesFileExtenstion } from '../shared/constants';
import { promptsMap } from '../shared/prompts';
import { PromptsNames } from '../types/index';

import { logger } from './logger';
import { generatePath } from './generatePath';
import { isDirectoryEmpty } from './isDirectoryEmpty';
import { copyDirectoryWithExclusion } from './copyDirectoryWithExclusion';

export const copyComponents = async (componentsNames: string[], outputPath: string) => {
  try {
    componentsNames.forEach(async (componentName) => {
      const componentPath = generatePath({
        basePath: componentsDirectoryPath,
        targetPath: componentName.toLowerCase(),
      });
      const isEmpty = isDirectoryEmpty(componentPath);

      if (isEmpty) throw Error();

      const destinationDirectory = path.join(outputPath, componentName.toLocaleLowerCase());
      const { shouldIncludeStories } = await prompts([promptsMap[PromptsNames.ShouldIncludeStories]], {
        onCancel: () => process.exit(0),
      });
      const excludedExtensions = !shouldIncludeStories
        ? [jsonFileExtenstion, storiesFileExtenstion]
        : [jsonFileExtenstion];

      copyDirectoryWithExclusion({
        sourceDirectory: componentPath,
        destinationDirectory,
        excludedExtensions,
      });
    });
  } catch (error) {
    logger.error('There is no component to copy');
  }
};
