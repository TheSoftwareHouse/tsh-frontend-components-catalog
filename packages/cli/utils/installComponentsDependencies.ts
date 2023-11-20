import prompts from 'prompts';
import { ListObjectsV2Output } from '@aws-sdk/client-s3';

import { PackageManagers, PathList, PromptsNames, SchemaComponent } from '../types/index';
import { promptsMap } from '../shared/prompts';

import { getSchema } from './getSchema';
import { copyComponents } from './copyComponents';
import { installDependencies } from './installDependencies';

interface InstallComponentsDependenciesArguments {
  component: SchemaComponent;
  packageManager: PackageManagers;
  Contents: ListObjectsV2Output['Contents'];
  destinationDirectory: string;
  pathList: PathList;
}

export const installComponentsDependencies = async ({
  component,
  packageManager,
  Contents,
  pathList,
  destinationDirectory,
}: InstallComponentsDependenciesArguments) => {
  const { componentsDependencies } = component;

  if (componentsDependencies.length) {
    const components = componentsDependencies.join(', ');
    const componentsPrompt = promptsMap[PromptsNames.ShouldCopyComponents](components);
    const { shouldCopyComponents } = await prompts(componentsPrompt, { onCancel: () => process.exit(0) });

    if (shouldCopyComponents) {
      const { getComponentByName } = getSchema();
      const listOfComponentDependencies = componentsDependencies.map((component) => getComponentByName(component));

      if (listOfComponentDependencies.length > 0) {
        await copyComponents({
          listOfComponentDependencies,
          Contents,
          pathList,
          destinationDirectory,
        });

        for (const component of listOfComponentDependencies) {
          if (component) {
            await installDependencies({ component, packageManager });
          }
        }
      }
    }
  }
};
