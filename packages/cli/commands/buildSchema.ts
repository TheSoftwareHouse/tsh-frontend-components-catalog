import { Command } from 'commander';
import fs from 'fs';
import path from 'path';

import { __dirname, componentsDirectoryPath, defaultEncoding, schemaFileName } from '../shared/constants';
import { getDirectories } from '../utils/getDirectories';
import { SchemaComponent } from '../types';
import { logger } from '../utils/logger';

export const buildSchema = new Command();

buildSchema
  .name('buildSchema')
  .description('Build schema.json file')
  .action(async () => {
    const components: SchemaComponent[] = [];

    getDirectories(componentsDirectoryPath).forEach((dirName) => {
      const schemaPath = path.resolve('../components', dirName, schemaFileName);
      const isSchemaDefined = fs.existsSync(schemaPath);

      if (!isSchemaDefined) {
        logger.error(`Couldn't build CLI, schema.json is missing for ${dirName} component`);
        process.exit(0);
      }

      const component = JSON.parse(fs.readFileSync(schemaPath, defaultEncoding)) as SchemaComponent;
      components.push(component);
    });

    const schemaJsonFile = JSON.stringify({ components });
    const destinationPath = path.join(__dirname, schemaFileName);
    fs.writeFileSync(destinationPath, schemaJsonFile);
  });
