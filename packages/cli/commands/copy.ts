import { Command } from 'commander';
import fs from 'fs';
import prompts, { PromptObject } from 'prompts';
import path from 'path';

import { getSchema } from '../utils/getSchema';
import { logger } from '../utils/logger';
import {
  settingsJsonOutputPath,
  defaultEncoding,
  componentsDirectoryPath,
  jsonFileExtenstion,
  storiesFileExtenstion,
} from '../shared/constants';
import { generatePath } from '../utils/generatePath';
import { installDependencies } from '../utils/installDependencies';
import { isDirectoryEmpty } from '../utils/isDirectoryEmpty';
import { copyDirectoryWithExclusion } from '../utils/copyDirectoryWithExclusion';
import { PromptSelectChoices, PromptsNames, SettingsFile } from '../types/index';
import { promptsMap } from '../shared/prompts';

const getCopyPrompts = ({
  projectsChoices,
  componentsChoices,
}: Record<string, PromptSelectChoices>): PromptObject<string>[] => {
  const prompts = [promptsMap[PromptsNames.SrcPath](componentsChoices), promptsMap[PromptsNames.ShouldIncludeStories]];

  if (projectsChoices.length > 1) {
    prompts.unshift(promptsMap[PromptsNames.Project](projectsChoices));
  }

  return prompts;
};

export const copy = new Command();

copy
  .name('copy')
  .description('Copy selected component')
  .action(async () => {
    const projectsChoices: PromptSelectChoices = [];

    try {
      const { projects }: SettingsFile = JSON.parse(fs.readFileSync(settingsJsonOutputPath, defaultEncoding));

      projects.forEach(({ name, path, packageManager }) => {
        projectsChoices.push({
          title: name,
          value: { path: generatePath({ targetPath: path }), packageManager },
        });
      });
    } catch (error) {
      logger.error("Couldn't find settings file, make sure you have CLI initialized");
      logger.info('To initialize CLI, run command: npm run init');
      process.exit(0);
    }

    const componentsChoices: PromptSelectChoices = [];
    const { components, getComponentByName } = getSchema();

    try {
      components.forEach(({ name, directoryName }) => {
        const directoryPath = generatePath({ basePath: componentsDirectoryPath, targetPath: directoryName });
        const isEmpty = isDirectoryEmpty(directoryPath);

        if (isEmpty) return;

        componentsChoices.push({
          title: name,
          value: directoryPath,
        });
      });

      if (!componentsChoices.length) {
        throw Error();
      }
    } catch (error) {
      logger.error('There is no component to copy');
      process.exit(0);
    }

    const copyPrompts = getCopyPrompts({ projectsChoices, componentsChoices });

    const results = await prompts(copyPrompts, { onCancel: () => process.exit(0) });
    const { path: outputPath, packageManager } = results.project ?? projectsChoices[0].value;
    const destinationDirectory = `${outputPath}/${path.basename(results.srcPath)}`;
    const excludedExtensions = !results.shouldIncludeStories
      ? [jsonFileExtenstion, storiesFileExtenstion]
      : [jsonFileExtenstion];

    try {
      copyDirectoryWithExclusion({
        sourceDirectory: results.srcPath,
        destinationDirectory,
        excludedExtensions,
      });

      logger.success(`Component was successfully copied to: ${destinationDirectory}`);
    } catch (error) {
      logger.error("Couldn't copy selected component, try again");
      process.exit(0);
    }

    const copiedComponentName = componentsChoices.find(({ value }) => value === results.srcPath)?.title;

    if (typeof copiedComponentName !== 'string') return;

    const component = getComponentByName(copiedComponentName);

    if (!component) return;

    await installDependencies({ component, outputPath, packageManager });
  });
