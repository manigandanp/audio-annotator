export const segmenterUrl = 'http://localhost:8000';
export const baseDir = process.env.NODE_ENV == 'production' ? '/data' : '../data';
export const uploadsDir = `${baseDir}/uploads/`;
export const segmenter = {
  trimThreshold: 10,
  sileceThreshold: 75,
  url: segmenterUrl,
  sileceSegmenterUrl: `${segmenterUrl}/v2/segment/silence`,
  sampleSegmenterUrl: `${segmenterUrl}/v2/segment/samples`,
};
