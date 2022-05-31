let host: string, dataDir: string;

if (process.env.NODE_ENV == 'production') {
  host = 'segmenter'
  dataDir = '/data'
} else {
  host = 'localhost:8000'
  dataDir = '../data'
}

export const segmenterUrl = `http://${host}`;
export const baseDir = dataDir;
export const uploadsDir = `${baseDir}/uploads/`;
export const segmenter = {
  trimThreshold: 10,
  sileceThreshold: 75,
  url: segmenterUrl,
  sileceSegmenterUrl: `${segmenterUrl}/v2/segment/silence`,
  sampleSegmenterUrl: `${segmenterUrl}/v2/segment/samples`,
};
