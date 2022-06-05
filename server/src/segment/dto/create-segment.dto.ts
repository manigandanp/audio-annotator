export interface SegmenterClientDto {
  projectId: string;
  sourceId?: string;
  projectName: string;
  sourceFilename: string;
  sourceFilePath: string;
  trimThreshold?: number;
}

export interface SilenceSegmenterClientDto extends SegmenterClientDto {
  silenceThreshold?: number;
}

export interface SamplesSegmenterClientDto extends SegmenterClientDto {
  id?: string;
  startSample: number;
  endSample: number;
  filename?: string;
  fileAbsolutePath?: string;
  sourceId?: string;
  titleId: string;
  duration?: number;
  sourceFilePath: string;
  trimThreshold?: number
}
