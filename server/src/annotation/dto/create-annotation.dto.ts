export class CreateAnnotationDto {
  segmentId: string;
  annotation: string;
  cleansedAnnotaion?: string;
  emotionalType?: string;
  isValid?: boolean;
}
