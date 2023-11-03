import fs from 'fs';

export const getDirectories = (source: string) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((directory) => directory.isDirectory())
    .map(({ name }) => name);
