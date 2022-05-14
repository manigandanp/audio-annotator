import { ChangeEvent } from "react";
import { Button, ClickAction } from "./RegionButton";

type AnnotationProps = {
  annotation: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  saveAnnotation: ClickAction;
};

export const Annotation = ({
  annotation,
  onChange,
  saveAnnotation,
}: AnnotationProps) => {
  return (
    <>
      <input
        className="px-1 col-11"
        value={annotation || ""}
        onChange={onChange}
        onBlur={saveAnnotation}
      />
      <div className="col-1">
        <Button onClickHandler={saveAnnotation} shortcutKey="s">
          Save
        </Button>
      </div>
    </>
  );
};
