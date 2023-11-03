import { promisify } from 'util';
import { exec } from 'child_process';
import ora from 'ora';

import { PackageManagers } from '../types/index';

import { logger } from './logger';

const execAsync = promisify(exec);

const installCommandMap = {
  [PackageManagers.Npm]: 'npm i',
  [PackageManagers.Yarn]: 'yarn add',
};

export const installPackages = async (packages: string[], packageManager: PackageManagers) => {
  const packagesString = packages.join(' ');
  const command = `${installCommandMap[packageManager]} ${packagesString}`;

  const spinner = ora('Installing packages, it may take a while').start();
  try {
    await execAsync(command);

    spinner.stop();
    logger.success(`Packages: ${packagesString} installed successfully`);
  } catch (error) {
    spinner.stop();
    logger.error('There was an error', error);
  }
};
