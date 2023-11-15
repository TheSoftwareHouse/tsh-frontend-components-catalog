import prompts from 'prompts';

import { PackageManagers, PromptsNames, SchemaComponent } from '../types/index';
import { promptsMap } from '../shared/prompts';

import { installPackages } from './installPackages';

interface InstallDependenciesArguments {
  component: SchemaComponent;
  packageManager: PackageManagers;
}

export const installDependencies = async ({ component, packageManager }: InstallDependenciesArguments) => {
  const { packagesDependencies, name } = component;

  if (packagesDependencies.length) {
    const packagesPrompt = promptsMap[PromptsNames.Packages](packagesDependencies, name);
    const { packages } = await prompts(packagesPrompt, {
      onCancel: () => {
        return process.exit(0);
      },
    });
    if (packages.length) await installPackages(packages, packageManager);
  }
};
