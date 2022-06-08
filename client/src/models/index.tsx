export interface Title {
  id: string;
  projectId: string;
  sourceFilename: string;
  sourceFilePath: string;
  sourceFileSize?: number;
  sampleRate?: number;
  sourceDuration?: number;
  createdAt?: string;
  updatedAt?: string;
  refTranscription?: string;
  project: Project;
  segments: Segment[];
}

export interface Project {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  name: string;
  titles?: number;
}

export interface Annotation {
  id?: string;
  annotation: string;
  segmentId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Segment {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  filename: string;
  startSample: number;
  endSample: number;
  duration: number;
  fileAbsolutePath: string;
  titleId: string;
  annotation?: Annotation;
}

export interface ResizedSegment {
  id?: string;
  filename?: string;
  startSample: number;
  endSample: number;
  duration: number;
  fileAbsolutePath?: string;
  titleId?: string;
  projectName?: string;
  projectId?: string;
  trimThreshold?: number;
  sourceFilePath?: string;
}

export type Option = {
  label: string;
  value: string;
};
