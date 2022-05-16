import { DoublyLinkedListNode } from "@datastructures-js/linked-list";
import React from "react";
import { Region } from "wavesurfer.js/src/plugin/regions";
import { ResizedSegment } from "../../models";
import { Annotation } from "./Annotation";

type Props = {
  currentRegion: DoublyLinkedListNode<Region>;
  resizedData?: ResizedSegment;
  annotation: string | undefined;
  updateAnnotationHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  saveAnnotationHandler: (r: DoublyLinkedListNode<Region>) => void;
};

export const CurrentRegion = ({
  currentRegion,
  resizedData,
  annotation,
  updateAnnotationHandler,
  saveAnnotationHandler,
}: Props) => {
  let formatSeconds = (segmentDuration: number) => segmentDuration.toFixed(3);

  let currentRegionValue = currentRegion.getValue().data;
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
    </div>
  );
};
