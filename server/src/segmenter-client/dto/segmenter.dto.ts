interface SegmenterRequestDto {
  project: string;
  source_file_path: string;
  trim_threshold?: number;
}

export interface SilenceSegmenterRequestDto extends SegmenterRequestDto {
  silence_threshold?: number;
}

export interface SampleSegmenterRequestDto extends SegmenterRequestDto {
  start_sample: number;
  end_sample: number;
}

interface SegmenterResponseDto {}
