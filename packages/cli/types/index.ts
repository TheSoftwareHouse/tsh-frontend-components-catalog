import { Choice } from 'prompts';

export interface Project {
  path: string;
  packageManager: string;
  name: string;
}

export interface SettingsFile {
  projects: Project[];
}

export type PromptSelectChoices = Choice[];

export interface SchemaComponent {
  name: string;
  directoryName: string;
  componentsDependencies: string[];
  packagesDependencies: string[];
}

export interface Schema {
  components: SchemaComponent[];
}

export enum PromptsNames {
  Packages = 'packages',
  ShouldCopyComponents = 'shouldCopyComponents',
  Path = 'path',
  Name = 'name',
  SrcPath = 'srcPath',
  ShouldIncludeStories = 'shouldIncludeStories',
  Project = 'project',
  PackageManager = 'packageManager',
}

export enum PackageManagers {
  Npm = 'npm',
  Yarn = 'yarn',
}

export type PathList = Array<string | undefined>;
