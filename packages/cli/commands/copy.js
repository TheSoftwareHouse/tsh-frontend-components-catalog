import { Command } from 'commander';
import fs from 'fs';
import prompts from 'prompts';
import fse from 'fs-extra';

import { logger } from '../utils/logger.js';
import { settingsJsonOutputPath, defaultEncoding, componentsDirectoryPath } from '../shared/constants.js';
import { getDirectories } from '../utils/getDirectories.js';
import { getLastSegmentOfPath } from '../utils/getLastSegmentOfPath.js';
import { highlightText } from '../utils/highlightText.js';
import { generatePath } from '../utils/generatePath.js';

const getCopyPrompts = ({ projectsChoices, componentsChoices }) => {
  const componentsPrompt = {
    type: 'select',
    name: 'srcPath',
    message: `Which ${highlightText('component')} would you like to copy?`,
    choices: componentsChoices,
  };

  if (projectsChoices.length > 1) {
    return [
      {
        type: 'select',
        name: 'outputPath',
        message: `Pick your destination ${highlightText('project')}`,
        choices: projectsChoices,
      },
      componentsPrompt,
    ];
  }

  return [componentsPrompt];
};

export const copy = new Command();

copy
  .name('copy')
  .description('Copy selected component')
  .action(async () => {
    const projectsChoices = [];

    try {
      const settings = fs.readFileSync(settingsJsonOutputPath, defaultEncoding);

      JSON.parse(settings).projects.forEach(({ name, path }) => {
        projectsChoices.push({
          title: name,
          value: path,
        });
      });
    } catch (error) {
      logger.error("Couldn't find settings file, make sure you have CLI initialized");
      logger.info('To initialize CLI, run command: npm run init');
      process.exit(0);
    }

    const componentsChoices = getDirectories(componentsDirectoryPath).map((dirName) => ({
      title: dirName,
      value: generatePath({ basePath: componentsDirectoryPath, targetPath: dirName }),
    }));

    const copyPrompts = getCopyPrompts({ projectsChoices, componentsChoices });

    const results = await prompts(copyPrompts, { onCancel: () => process.exit(0) });

    const outputPath = `${results.outputPath ?? projectsChoices[0].value}/${getLastSegmentOfPath(results.srcPath)}`;

    fse.copySync(results.srcPath, outputPath);

    logger.success(`Component was successfully copied to: ${outputPath}`);
  });
