import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CurrentRegion, Header, SpinnerIcon } from "../../components";
import {
  SegmentPlayActions,
  SegmentUpdateActions,
} from "../../components/segments";
import {
  titlesUrl,
  audioUrl,
  sampleSegmentsUrl,
  segmentsUrl,
  annotationsUrl,
} from "../../config";
import { Segment, TitleWithSegment, ResizedSegment } from "../../models";
import { get, post, remove } from "../../requests";
import { Region, RegionParams } from "wavesurfer.js/src/plugin/regions";
import Wavesurfer from "wavesurfer.js";
import lodash from "lodash";
import { createWaveSurfer } from "./createWaveSurfer";
import {
  DoublyLinkedList,
  DoublyLinkedListNode,
} from "@datastructures-js/linked-list";

export const TitlePage = () => {
  const { titleId } = useParams();
  const [showSpinner, setShowSpinner] = useState<boolean>(true);
  const [currentRegion, setCurrentRegion] =
    useState<DoublyLinkedListNode<Region>>();
  const [wavesurfer, setWavesurfer] = useState<Wavesurfer>();
  const [regions, setRegions] = useState<DoublyLinkedList<Region>>();
  const [resizedData, setResizedData] = useState<ResizedSegment>();
  const [annotation, setAnnotation] = useState<string>();
  const [refTranscription, setRefTranscription] = useState<string>();

  useEffect(() => {
    get(`${titlesUrl}/${titleId}`).then(
      (titlesWithSegments: TitleWithSegment) => {
        let segments = titlesWithSegments.segments;
        let regionParams: RegionParams[] = segments.map((s) =>
          toRegionParams(s, titlesWithSegments)
        );

        let wavesurfer = createWaveSurfer(regionParams);
        wavesurfer.zoom(75);
        wavesurfer.on("ready", () => {
          setShowSpinner(false);
          let sortedRegions = lodash.sortBy(
            lodash.values(wavesurfer.regions.list),
            (d) => parseInt(d.data.endSample as string)
          );

          let regionsList = DoublyLinkedList.fromArray(sortedRegions);
          let firstRegion = regionsList.head();
          setRegions(regionsList);
          currentRegionHandler(firstRegion);
          setWavesurfer(wavesurfer);
          setRefTranscription(
            firstRegion.getValue().data.refTranscription as string
          );
          wavesurfer.on("region-click", (r, e) =>
            regionClickHandler(r, e, regionsList, wavesurfer)
          );

          wavesurfer.on("region-update-end", (region: Region, action) => {
            currentRegionHandler(findRegionFromList(region, regionsList));
            let sampleRate = region.data.sampleRate as number;
            let newStartSample = timeToSample(region.start, sampleRate, true);
            let newEndSample = timeToSample(region.end, sampleRate);
            let newDuration = (newEndSample - newStartSample) / sampleRate;
            setResizedData({
              ...region.data,
              startSample: newStartSample,
              endSample: newEndSample,
              duration: newDuration,
            });
          });
        });

        loadAudio(wavesurfer, titlesWithSegments);
      }
    );
  }, []);

  const toRegionParams = (s: Segment, data: TitleWithSegment) => ({
    id: s.id,
    start: samplesToTime(s.startSample, data.sampleRate),
    end: samplesToTime(s.endSample, data.sampleRate),
    loop: false,
    data: {
      ...lodash.omit(s, ["annotation"]),
      projectId: data.projectId,
      projectName: data.projectName,
      sourceFilePath: data.sourceFilePath,
      sampleRate: data.sampleRate,
      annotation: s.annotation?.annotation,
      annotationId: s.annotation?.id,
      refTranscription: data.refTranscription,
    },
    drag: false,
    resize: true,
  });

  const currentRegionHandler = (
    regionNode: DoublyLinkedListNode<Region> | undefined,
    shouldPlay: boolean = false
  ) => {
    if (regionNode) {
      let region = regionNode.getValue();
      setAnnotation(region.data.annotation as string);
      if (region.element) addRegionBG(region);
      setCurrentRegion((prev) => {
        if (prev) {
          let prevRegion = prev.getValue();
          let isSameRegion = prevRegion.id === regionNode.getValue().id;
          if (!isSameRegion && prevRegion.element) removeRegionBG(prevRegion);
        }
        return regionNode;
      });
      if (shouldPlay) playCurrentRegion(regionNode.getValue());
    } else console.log("No regions selected");
  };

  const samplesToTime = (sample: number, sampleRate: number) =>
    sample / sampleRate;

  const timeToSample = (
    time: number,
    sampleRate: number,
    floor: boolean = false
  ) => {
    if (floor) return Math.floor(time * sampleRate);
    return Math.ceil(time * sampleRate);
  };

  const addRegionBG = (region: Region) =>
    (region.element as HTMLElement).classList.add("playing-region");
  const removeRegionBG = (region: Region) =>
    (region.element as HTMLElement).classList.remove("playing-region");

  const playCurrentRegion = (region: Region | undefined) => {
    if (region) wavesurfer?.play(region.start, region.end);
    else console.log("No regions to play");
  };

  const nextRegionHandler = () =>
    currentRegionHandler(currentRegion?.getNext() || regions?.tail(), true);
  const prevRegionHandler = () =>
    currentRegionHandler(currentRegion?.getPrev() || regions?.head(), true);

  const findRegionFromList = (
    region: Region,
    regions: DoublyLinkedList<Region>
  ) => regions?.find((n) => n.getValue().id === region.id);

  const regionClickHandler = (
    region: Region,
    e: Event,
    regions: DoublyLinkedList<Region>,
    wavesurfer: Wavesurfer
  ) => {
    // e.stopPropagation(); // uncomment to play region from beginning when clicking it.
    currentRegionHandler(findRegionFromList(region, regions));
    wavesurfer.play(region.start, region.end);
    region.once("out", () => {
      wavesurfer.play(region.end);
      wavesurfer.pause();
    });
  };

  const regionResizeHandler = () => {
    setShowSpinner(true);
    if (resizedData) {
      post(sampleSegmentsUrl, resizedData).then((data) => {
        setShowSpinner(false);
        let currentRegionData = currentRegion?.getValue();
        currentRegionData?.update({
          data: { ...currentRegionData.data, ...data },
        });
        setResizedData(undefined);
      });
    } else {
      console.log("resize data is empty");
    }
  };

  const deleteHandler = () => {
    if (wavesurfer?.isPlaying) wavesurfer?.pause();
    setShowSpinner(true);
    if (currentRegion) {
      let currentRegionData = currentRegion.getValue();
      let nextRegion = currentRegion.getNext();
      remove(
        `${segmentsUrl}?segmentFilePath=${currentRegionData?.data.fileAbsolutePath}`,
        {}
      ).then((data) => {
        setShowSpinner(false);
        regions?.remove(currentRegion); // remove from list
        currentRegionData?.remove(); // remove from regions
        currentRegionHandler(nextRegion);
      });
    } else {
      console.log("No regions selected");
      setShowSpinner(false);
    }
  };

  const addNewRegionHandler = () => {
    let currentRegionData = currentRegion?.getValue();
    let sampleRate = currentRegionData?.data.sampleRate as number;
    let newRegionStartTime = (currentRegionData?.end || 0) + 0.05;
    let newRegionEndTime = (currentRegionData?.end || 0) + 0.25;
    let newRegionStartSample = timeToSample(newRegionStartTime, sampleRate);
    let newRegionEndSample = timeToSample(newRegionEndTime, sampleRate);
    let sourceData = {
      sourceFilePath: currentRegionData?.data.sourceFilePath,
      projectName: currentRegionData?.data.projectName,
      projectId: currentRegionData?.data.projectId,
      titleId: currentRegionData?.data.titleId,
    };
    let regionParams: RegionParams = {
      start: newRegionStartTime,
      end: newRegionEndTime,
      data: {
        startSample: newRegionStartSample,
        endSample: newRegionEndSample,
        ...sourceData,
      },
    };

    setShowSpinner(true);
    post(sampleSegmentsUrl, regionParams.data).then((res) => {
      regionParams = {
        id: res.id,
        start: newRegionStartTime,
        end: newRegionEndTime,
        data: {
          ...res,
          ...sourceData,
          sampleRate: sampleRate,
        },
      };
      let newRegion = wavesurfer?.addRegion(regionParams);
      regions?.insertAt(getRegionIndex() + 1, newRegion);
      setShowSpinner(false);
    });
  };

  const getRegionIndex = () => {
    let idx = 0;
    regions?.filter((r, p) => {
      let f: boolean = r.getValue().id === currentRegion?.getValue().id;
      if (f) idx = p;
      return f;
    });

    return idx;
  };

  const updateAnnotationHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAnnotation(e.target.value);

  const saveAnnotationHandler = (
    currentRegion: DoublyLinkedListNode<Region>
  ) => {
    let currentRegionData = currentRegion.getValue();
    let updatedAnnotation = {
      annotation: annotation,
      segmentId: currentRegionData.data.id,
    };
    if (currentRegionData.data.annotation !== annotation) {
      setShowSpinner(true);
      post(annotationsUrl, updatedAnnotation).then((res) => {
        currentRegionData.update({
          data: {
            ...currentRegionData.data,
            annotation: res.annotation,
          },
        });
        setShowSpinner(false);
      });
    }
  };

  const refTranscriptionHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let val = e.target?.value.trim();
    setRefTranscription(val);
  };

  return (
    <>
      <Header isButtonEnabled={false} />
      <SpinnerIcon showSpinner={showSpinner} />

      <div className="container-fluid">
        {currentRegion ? (
          <div className="row text-center text-secondary">
            <h4>
              {currentRegion?.getValue().data.projectName as string} -{" "}
              {lodash.last(
                (currentRegion?.getValue().data.sourceFilePath as string).split(
                  "/"
                )
              )}
            </h4>
          </div>
        ) : null}
        <div className="row justify-content-md-center border">
          <div id="waveform" className="border"></div>
          <div id="timeline"></div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <SegmentUpdateActions
              addRegion={addNewRegionHandler}
              deleteRegion={deleteHandler}
              resizeRegion={regionResizeHandler}
            />
          </div>
          <div className="col">
            <SegmentPlayActions
              prevRegion={prevRegionHandler}
              playRegion={() => playCurrentRegion(currentRegion?.getValue())}
              pauseRegion={() => wavesurfer?.pause()}
              nextRegion={nextRegionHandler}
            />
          </div>
        </div>

        {currentRegion ? (
          <div className="row my-2">
            <div className="col">
              <CurrentRegion
                currentRegion={currentRegion}
                resizedData={resizedData}
                annotation={annotation}
                updateAnnotationHandler={updateAnnotationHandler}
                saveAnnotationHandler={saveAnnotationHandler}
              />
            </div>
            <div className="col" style={{ height: "625px" }}>
              <textarea
                style={{ width: "100%", height: "100%" }}
                className="text-left justify-center"
                value={refTranscription}
                onChange={refTranscriptionHandler}
              />
            </div>
          </div>
        ) : (
          <></>
        )}
        {/* <SegmentsTable segments={segments} /> */}
      </div>
    </>
  );
};

const loadAudio = (
  wavesurfer: Wavesurfer,
  titlesWithSegments: TitleWithSegment
) => wavesurfer.load(`${audioUrl}?path=${titlesWithSegments.sourceFilePath}`);
