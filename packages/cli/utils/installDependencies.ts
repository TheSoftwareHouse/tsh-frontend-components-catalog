import prompts from 'prompts';

import { PackageManagers, PromptsNames, SchemaComponent } from '../types/index';
import { promptsMap } from '../shared/prompts';

import { installPackages } from './installPackages';
import { copyComponents } from './copyComponents';

interface InstallDependenciesArguments {
  component: SchemaComponent;
  outputPath: string;
  packageManager: PackageManagers;
}

export const installDependencies = async ({ component, outputPath, packageManager }: InstallDependenciesArguments) => {
  const { packagesDependencies, componentsDependencies } = component;

  if (packagesDependencies.length) {
    const packagesPrompt = promptsMap[PromptsNames.Packages](packagesDependencies);
    const { packages } = await prompts(packagesPrompt, { onCancel: () => process.exit(0) });

    if (packages.length) await installPackages(packages, packageManager);
  }

  if (componentsDependencies.length) {
    const components = componentsDependencies.join(', ');
    const componentsPrompt = promptsMap[PromptsNames.ShouldCopyComponents](components);
    const { shouldCopyComponents } = await prompts(componentsPrompt, { onCancel: () => process.exit(0) });

    if (shouldCopyComponents) await copyComponents(componentsDependencies, outputPath);
  }
};
