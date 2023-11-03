import fs from 'fs';

export const isDirectoryEmpty = (directoryPath: string) =>
  fs.existsSync(directoryPath) ? !Boolean(fs.readdirSync(directoryPath).length) : true;
