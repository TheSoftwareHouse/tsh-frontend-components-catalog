import fs from 'fs';
import { Command } from 'commander';
import prompts from 'prompts';

import { logger } from '../utils/logger.js';
import { defaultEncoding, projectRootPath, settingsJsonOutputPath } from '../shared/constants.js';
import { highlightText } from '../utils/highlightText.js';
import { generatePath } from '../utils/generatePath.js';

const initPrompts = [
  {
    type: 'text',
    name: 'path',
    message: `What is your project ${highlightText('components')} directory path (relative or absolute)?`,
    initial: projectRootPath,
  },
  {
    type: 'text',
    name: 'name',
    message: `How the ${highlightText('project')} should be named?`,
    initial: 'my-current-project',
  },
];

const successMessage = 'Project destination set up successfully';
const errorMesssage = "Couldn't set up destination project data, please try again";

const handleError = (error) => {
  if (error) {
    logger.error(errorMesssage);
    process.exit(0);
  }
};

export const init = new Command();

init
  .name('init')
  .description('Initialize settings file')
  .action(async () => {
    const { path, name } = await prompts(initPrompts, { onCancel: () => process.exit(0) });

    const projectSettings = {
      path: generatePath({ targetPath: path }),
      name,
    };

    const doesSettingsFileExist = fs.existsSync(settingsJsonOutputPath);

    if (doesSettingsFileExist) {
      try {
        const settings = JSON.parse(fs.readFileSync(settingsJsonOutputPath, defaultEncoding));
        const doesProjectNameAlreadyExist = settings.projects.map(({ name }) => name).includes(projectSettings.name);

        if (doesProjectNameAlreadyExist) {
          logger.error('Project already exist in settings file, please provide unique project name');
          process.exit(0);
        }

        settings.projects.push(projectSettings);
        const jsonUpdatedData = JSON.stringify(settings);

        fs.writeFileSync(settingsJsonOutputPath, jsonUpdatedData, defaultEncoding);
      } catch (error) {
        handleError(error);
      } finally {
        logger.success(successMessage);
      }
    } else {
      const jsonProjectsSettings = JSON.stringify({ projects: [projectSettings] });

      try {
        fs.writeFileSync(settingsJsonOutputPath, jsonProjectsSettings);
      } catch (error) {
        handleError(error);
      } finally {
        logger.success(successMessage);
      }
    }
  });
