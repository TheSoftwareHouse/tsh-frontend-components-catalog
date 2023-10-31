import path from 'path';

import { projectRootPath } from '../shared/constants.js';

export const generatePath = ({ basePath = projectRootPath, targetPath }) => {
  if (path.isAbsolute(targetPath)) {
    return targetPath;
  } else {
    return path.join(basePath, targetPath);
  }
};
