import path from 'path';

import { PromptSelectChoices, PromptsNames } from '../types/index';
import { highlightText } from '../utils/highlightText';

import { packageManagers, promptTypes } from './constants';

const MULTISELECT_HINT = `${highlightText('SPACE')} to select | ${highlightText('ENTER')} to submit | ${highlightText(
  'A',
)} to select/unselect all`;

export const promptsMap = {
  [PromptsNames.Packages]: (packages: string[], componentName?: string) => ({
    name: PromptsNames.Packages,
    message: `Which packages used by ${
      componentName ? `${highlightText(componentName)}` : 'that component'
    } would you like to install?`,
    type: promptTypes.multiselect,
    choices: packages.map((packageName) => ({ value: packageName, title: packageName })),
    instructions: false,
    hint: MULTISELECT_HINT,
  }),
  [PromptsNames.ShouldCopyComponents]: (components: string) => ({
    name: PromptsNames.ShouldCopyComponents,
    message: `Would you like to copy other components (${highlightText(components)}) that are used by that component?`,
    type: promptTypes.confirm,
    initial: true,
  }),
  [PromptsNames.Path]: {
    type: promptTypes.text,
    name: PromptsNames.Path,
    message: `What is ${highlightText('components')} directory path, relative to your project root?`,
    validate: (value: string) => (!value || path.isAbsolute(value) ? 'Path should be relative' : true),
  },
  [PromptsNames.Name]: {
    type: promptTypes.text,
    name: PromptsNames.Name,
    message: `How the ${highlightText('project')} should be named?`,
    initial: 'my-current-project',
  },
  [PromptsNames.SrcPath]: (componentsChoices: PromptSelectChoices) => ({
    name: PromptsNames.SrcPath,
    message: `Which ${highlightText('components')} would you like to copy?`,
    type: promptTypes.multiselect,
    choices: componentsChoices,
    instructions: false,
    hint: MULTISELECT_HINT,
  }),
  [PromptsNames.ShouldIncludeStories]: (componentName?: string) => ({
    type: promptTypes.confirm,
    name: PromptsNames.ShouldIncludeStories,
    message: `Would you like to copy ${highlightText('Storybook (*.stories.tsx)')} files ${
      componentName ? `for ${highlightText(componentName)} ` : ''
    }as well?`,
    initial: true,
  }),
  [PromptsNames.Project]: (projectsChoices: PromptSelectChoices) => ({
    type: promptTypes.select,
    name: PromptsNames.Project,
    message: `Pick your destination ${highlightText('project')}`,
    choices: projectsChoices,
  }),
  [PromptsNames.PackageManager]: {
    type: promptTypes.select,
    name: PromptsNames.PackageManager,
    message: `Pick your ${highlightText('package manager')}`,
    choices: packageManagers.map((packageManager) => ({ title: packageManager, value: packageManager })),
  },
};
