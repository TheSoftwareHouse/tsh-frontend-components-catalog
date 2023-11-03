import fs from 'fs';
import { Command } from 'commander';
import prompts from 'prompts';

import { logger } from '../utils/logger';
import { defaultEncoding, settingsJsonOutputPath } from '../shared/constants';
import { PromptsNames, SettingsFile } from '../types/index';
import { promptsMap } from '../shared/prompts';

const initPrompts = [
  promptsMap[PromptsNames.Path],
  promptsMap[PromptsNames.PackageManager],
  promptsMap[PromptsNames.Name],
];

const successMessage = 'Project destination set up successfully';
const errorMesssage = "Couldn't set up destination project data, please try again";

const handleError = (error: unknown) => {
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
    const { path, name, packageManager } = await prompts(initPrompts, { onCancel: () => process.exit(0) });

    const projectSettings = {
      path,
      packageManager,
      name,
    };

    const doesSettingsFileExist = fs.existsSync(settingsJsonOutputPath);

    if (doesSettingsFileExist) {
      try {
        const settings: SettingsFile = JSON.parse(fs.readFileSync(settingsJsonOutputPath, defaultEncoding));
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
