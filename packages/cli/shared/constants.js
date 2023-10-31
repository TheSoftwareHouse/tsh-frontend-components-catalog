import path from 'path';
import { fileURLToPath } from 'url';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
export const projectRootPath = path.resolve(__dirname, '../../..');
export const componentsDirectoryPath = path.resolve(__dirname, '../../components');
export const defaultEncoding = 'utf-8';
export const settingsJsonOutputPath = `${projectRootPath}/cli.settings.json`;
