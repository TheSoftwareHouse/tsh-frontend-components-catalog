import { Command } from 'commander';
import fs from 'fs';
import path from 'path';

import { __dirname, COMPONENT_ITEMS_BUCKET, EXCLUDED_BASE_S3_PATHS, schemaFileName } from '../shared/constants';
import { SchemaComponent } from '../types';
import { logger } from '../utils/logger';
import { getS3Object } from '../utils/getS3Object';
import { getBucketContent } from '../utils/getBucketContent';

export const buildSchema = new Command();

buildSchema
  .name('buildSchema')
  .description('Build schema.json file')
  .action(async () => {
    const components: SchemaComponent[] = [];

    try {
      const { pathList, Contents } = await getBucketContent();

      if (!pathList) {
        logger.error(`Couldn't find list of folders with components in S3`);
        process.exit(0);
      }

      for (const element of pathList) {
        if (!element || EXCLUDED_BASE_S3_PATHS.includes(element)) {
          continue;
        }

        const schemaPath = `${element}/${schemaFileName}`;
        const getSchema = Contents?.find((content) => content.Key === schemaPath);
        const dirName = element?.split(path.sep).at(-1);

        if (!getSchema || !getSchema?.Key) {
          logger.error(`Couldn't build CLI, schema.json is missing for path ${dirName}`);
          process.exit(0);
        }

        const getObjectItem = await getS3Object(COMPONENT_ITEMS_BUCKET, getSchema.Key);

        if (getObjectItem) {
          const component = JSON.parse(getObjectItem);
          components.push(component);
        }
      }

      const schemaJsonFile = JSON.stringify({ components });
      const destinationPath = path.join(__dirname, schemaFileName);

      fs.writeFileSync(destinationPath, schemaJsonFile);
    } catch (error) {
      logger.error("Couldn't find selected component, try again");
    }
  });
