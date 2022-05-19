import { ChangeEvent } from "react";
import { Button, ClickAction } from "./RegionButton";

type AnnotationProps = {
  annotation: string;
  onChangeAnnotationHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  saveAnnotation: ClickAction;
};

export const Annotation = ({
  annotation,
  onChangeAnnotationHandler,
  saveAnnotation,
}: AnnotationProps) => {
  return (
    <>
      <input
        className="px-1 col-11"
        value={annotation || ""}
        onChange={onChangeAnnotationHandler}
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
