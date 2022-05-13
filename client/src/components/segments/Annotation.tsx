import { ChangeEvent } from "react";

type AnnotationProps = {
  annotation: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const Annotation = ({ annotation, onChange, onBlur }: AnnotationProps) => {
  return <input className="px-1" value={annotation || ""} onChange={onChange} onBlur={onBlur} />;
};
