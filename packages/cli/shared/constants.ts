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
export const storiesFileExtension = '.stories.tsx';
export const jsonFileExtension = '.json';
export const promptTypes = {
  multiselect: 'multiselect',
  select: 'select',
  confirm: 'confirm',
  text: 'text',
} as const;

export const packageManagers = ['npm', 'yarn'];

/* eslint-disable @typescript-eslint/no-var-requires */
export const { version: packageVersion } = require('../../../package.json');

export const COMPONENT_ITEMS_BUCKET = process.env.S3_BUCKET_COMPONENT_ITEMS || '';

export const EXCLUDED_BASE_S3_PATHS = [`${packageVersion}/.`, `${packageVersion}/`, `.`];
