import path from 'path';

import { currentPath } from '../shared/constants';

interface GeneratePathArguments {
  basePath?: string;
  targetPath: string;
}

export const generatePath = ({ basePath = currentPath, targetPath }: GeneratePathArguments) => {
  if (path.isAbsolute(targetPath)) {
    return targetPath;
  } else {
    return path.join(basePath, targetPath);
  }
};
