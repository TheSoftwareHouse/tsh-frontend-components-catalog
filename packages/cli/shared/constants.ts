import path from 'path';
import { fileURLToPath } from 'url';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
export const currentPath = process.cwd();
export const schemaFilePath = path.resolve(__filename, '../schema.json');
export const componentsDirectoryPath = path.resolve(__filename, '../components');
export const defaultEncoding = 'utf-8';
export const settingsJsonOutputPath = `${currentPath}/cli.settings.json`;
export const schemaFileName = 'schema.json';
export const storiesFileExtenstion = '.stories.tsx';
export const jsonFileExtenstion = '.json';
export const promptTypes = {
  multiselect: 'multiselect',
  select: 'select',
  confirm: 'confirm',
  text: 'text',
} as const;
export const packageManagers = ['npm', 'yarn'];
