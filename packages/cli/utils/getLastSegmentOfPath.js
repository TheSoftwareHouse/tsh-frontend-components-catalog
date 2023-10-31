import { sep } from 'path';

export const getLastSegmentOfPath = (path) => {
  const pathSegments = path.split(sep);
  const pathSegmentsCount = pathSegments.length;

  return pathSegments[pathSegmentsCount - 1];
};
