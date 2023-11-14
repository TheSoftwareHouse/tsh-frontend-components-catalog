import prompts from 'prompts';
import { ListObjectsV2Output } from '@aws-sdk/client-s3';

import { PackageManagers, PathList, PromptsNames, SchemaComponent } from '../types/index';
import { promptsMap } from '../shared/prompts';

import { installPackages } from './installPackages';
import { copyComponents } from './copyComponents';

interface InstallDependenciesArguments {
  component: SchemaComponent;
  packageManager: PackageManagers;
  Contents: ListObjectsV2Output['Contents'];
  destinationDirectory: string;
  pathList: PathList;
}

export const installDependencies = async ({
  component,
  packageManager,
  Contents,
  pathList,
  destinationDirectory,
}: InstallDependenciesArguments) => {
  const { packagesDependencies, componentsDependencies } = component;

  if (packagesDependencies.length) {
    const packagesPrompt = promptsMap[PromptsNames.Packages](packagesDependencies);
    const { packages } = await prompts(packagesPrompt, {
      onCancel: () => {
        return process.exit(0);
      },
    });
    if (packages.length) await installPackages(packages, packageManager);
  }

  if (componentsDependencies.length) {
    const components = componentsDependencies.join(', ');
    const componentsPrompt = promptsMap[PromptsNames.ShouldCopyComponents](components);
    const { shouldCopyComponents } = await prompts(componentsPrompt, { onCancel: () => process.exit(0) });

    if (shouldCopyComponents)
      await copyComponents({
        componentsDependencies,
        Contents,
        pathList,
        destinationDirectory,
      });
  }
};
