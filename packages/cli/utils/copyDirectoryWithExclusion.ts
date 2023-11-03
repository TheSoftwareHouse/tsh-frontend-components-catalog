import path from 'path';
import fs from 'fs';

interface CopyDirectoryWithExclusionArguments {
  sourceDirectory: string;
  destinationDirectory: string;
  excludedExtensions: string[];
}

export const copyDirectoryWithExclusion = ({
  sourceDirectory,
  destinationDirectory,
  excludedExtensions,
}: CopyDirectoryWithExclusionArguments) => {
  fs.cpSync(sourceDirectory, destinationDirectory, { recursive: true });

  if (excludedExtensions.length) {
    const files = fs.readdirSync(destinationDirectory, { recursive: true });

    files.forEach((file) => {
      const fileString = String(file);
      const filePath = path.join(destinationDirectory, fileString);
      const shouldRemoveFile = excludedExtensions.some((extension) => path.basename(filePath).endsWith(extension));

      if (shouldRemoveFile) {
        fs.rmSync(filePath);
      }
    });
  }
};
