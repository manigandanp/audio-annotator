import { DoublyLinkedListNode } from "@datastructures-js/linked-list";
import React from "react";
import { Region } from "wavesurfer.js/src/plugin/regions";
import { ResizedSegment } from "../../models";
import { Annotation } from "./Annotation";

type Props = {
  currentRegion: DoublyLinkedListNode<Region>;
  resizedData?: ResizedSegment;
  annotation: string | undefined;
  cleansedAnnotation: string | undefined;
  emotionalType: string | undefined;
  isValid: boolean;
  updateAnnotationHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  updateCleansedAnnotationHandler: (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  updateEmotionalTypeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  updateIsValidHandler: () => void;
  saveAnnotationHandler: (r: DoublyLinkedListNode<Region>) => void;
};

export const CurrentRegion = ({
  currentRegion,
  resizedData,
  annotation,
  cleansedAnnotation,
  emotionalType,
  isValid,
  updateAnnotationHandler,
  updateCleansedAnnotationHandler,
  updateEmotionalTypeHandler,
  updateIsValidHandler,
  saveAnnotationHandler,
}: Props) => {
  let formatSeconds = (segmentDuration: number) => segmentDuration.toFixed(3);

  let currentRegionValue = currentRegion.getValue().data;
  let isEmotionalType = emotionalType?.toLowerCase().includes("emotional");
  console.log(currentRegionValue, cleansedAnnotation, annotation, isValid, emotionalType);
  return (
    <div className="current-region">
      <div className="row">
        <span className="m-auto text-center">
          {currentRegionValue.filename as string}
        </span>
      </div>
      <table className="table table-stripped">
        <thead>
          <tr>
            <td>Region</td>
            <td>Start</td>
            <td>End</td>
            <td>Duration(sec)</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Current</td>
            <td>{currentRegionValue.startSample as string}</td>
            <td>{currentRegionValue.endSample as string}</td>
            <td>{formatSeconds(currentRegionValue.duration as number)}</td>
          </tr>
          {resizedData ? (
            <tr>
              <td>Resized</td>
              <td>{resizedData.startSample}</td>
              <td>{resizedData.endSample}</td>
              <td>{formatSeconds(resizedData.duration as number)}</td>
            </tr>
          ) : null}
        </tbody>
      </table>

      <div className="row m-auto d-flex">
        <Annotation
          annotation={annotation || ""}
          onChangeAnnotationHandler={updateAnnotationHandler}
          saveAnnotation={() => saveAnnotationHandler(currentRegion)}
        />
      </div>
      <div className="row my-2 p-1 fw-bold">
        <p>{annotation}</p>
      </div>
      {/* Validatoin Starts HERE*/}
      <div className="row">
        <span className="m-auto text-center">Validation</span>
      </div>
      <div className="row m-auto d-flex my-2">
        <div className="col">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              checked={isValid}
              onChange={() => updateIsValidHandler()}
            />

            <label className="form-check-label" htmlFor="flexCheckChecked">
              {`Is Valid - ${isValid}`}
            </label>
          </div>
        </div>
        <div className="col">
          <div
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              updateEmotionalTypeHandler(e);
            }}
          >
            <input
              type="radio"
              value="Neutral"
              name="emotionalType"
              className="form-check-input"
              checked={!isEmotionalType}
            />{" "}
            <label className="form-check-label">Neutral</label>
            <span className="mx-2"></span>
            <input
              type="radio"
              value="Emotional"
              name="emotionalType"
              className="form-check-input"
              checked={isEmotionalType}
            />{" "}
            <label className="form-check-label">Emotional</label>
          </div>
        </div>
      </div>
      <div className="row m-auto d-flex">
        <input
          className="p-2 col-11"
          value={cleansedAnnotation || annotation} // Cleaned Annotation
          onChange={updateCleansedAnnotationHandler}
          onBlur={() => saveAnnotationHandler(currentRegion)}
        />
      </div>
      <div className="row my-2 p-1 fw-bold">
        <p>{cleansedAnnotation}</p>
      </div>
      {/* Validatoin Ends HERE*/}
    </div>
  );
};
