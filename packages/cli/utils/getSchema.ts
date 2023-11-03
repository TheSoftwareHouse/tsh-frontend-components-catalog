import fs from 'fs';

import { defaultEncoding, schemaFilePath } from '../shared/constants';
import { Schema } from '../types/index';

export const getSchema = () => {
  const schema = fs.readFileSync(schemaFilePath, defaultEncoding);
  const { components } = JSON.parse(schema) as Schema;

  const getComponentByName = (componentName: string) => {
    return components.find(({ name }) => name === componentName);
  };

  return { components, getComponentByName };
};
