import { DoublyLinkedListNode } from "@datastructures-js/linked-list";
import React from "react";
import { Region } from "wavesurfer.js/src/plugin/regions";
import { ResizedSegment } from "../../models";
import { Annotation } from "./Annotation";

type VoidFunction = () => void;
type Props = {
  currentRegion: DoublyLinkedListNode<Region>;
  resizedData?: ResizedSegment;
  addNewRegionHandler: VoidFunction;
  deleteHandler: VoidFunction;
  regionResizeHandler: VoidFunction;
  annotation: string | undefined;
  updateAnnotationHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  saveAnnotationHandler: (r: DoublyLinkedListNode<Region>) => void;
};

const getAnnotationSuggestion = (
  currentRegion: DoublyLinkedListNode<Region>
) => {
  let currentRegionValue = currentRegion.getValue();
  let prevRegionValue = currentRegion.getPrev()?.getValue();
  let sampleRate = currentRegionValue.data.sampleRate as number;
  let refTranscription = currentRegionValue.data.refTranscription as string;

  let wordsLen =
    getWordsLen(currentRegionValue.data.endSample as number, sampleRate, 1.2) +
    2;

  let prevWordsLen =
    getWordsLen(
      (prevRegionValue?.data?.endSample as number) || 0,
      sampleRate,
      1.2
    ) ;

    prevWordsLen = prevWordsLen ? prevWordsLen - 2 : prevWordsLen

  return refTranscription?.split(" ").slice(prevWordsLen, wordsLen).join(" ");
};

const getWordsLen = (endSample: number, sampleRate: number, avgWords: number) =>
  Math.ceil((endSample / sampleRate) * 1.2);

export const CurrentRegion = ({
  currentRegion,
  resizedData,
  addNewRegionHandler,
  deleteHandler,
  regionResizeHandler,
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

      <div className="row my-2">
        <div className="m-auto mb-3 text-center">
          <button
            className="btn btn-secondary mx-2 add"
            onClick={addNewRegionHandler}
          >
            Add
          </button>
          <button
            className="btn btn-secondary mx-2 delete"
            onClick={deleteHandler}
          >
            Delete
          </button>
          <button
            className="btn btn-secondary mx-2 resize"
            onClick={regionResizeHandler}
          >
            Resize
          </button>
        </div>
      </div>

      <div className="row m-2">
        <Annotation
          annotation={annotation || ""}
          onChange={updateAnnotationHandler}
          onBlur={() => saveAnnotationHandler(currentRegion)}
        />
      </div>
      <div className="row">
        <p>{getAnnotationSuggestion(currentRegion)}</p>
      </div>
    </div>
  );
};
