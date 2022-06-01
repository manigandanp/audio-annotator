import React from "react";
import { RegionAction, Button, ClickAction } from "./RegionButton";

const PreviousRegion = ({ onClickHandler, shortcutKey }: RegionAction) => {
  return (
    <Button onClickHandler={onClickHandler} shortcutKey={shortcutKey}>
      Prev(q)
    </Button>
  );
};

const NextRegion = ({ onClickHandler, shortcutKey }: RegionAction) => {
  return (
    <Button onClickHandler={onClickHandler} shortcutKey={shortcutKey}>
      Next(w)
    </Button>
  );
};

const PlayRegion = ({ onClickHandler, shortcutKey }: RegionAction) => {
  return (
    <Button onClickHandler={onClickHandler} shortcutKey={shortcutKey}>
      Play(z)
    </Button>
  );
};

const PauseRegion = ({ onClickHandler, shortcutKey }: RegionAction) => {
  return (
    <Button onClickHandler={onClickHandler} shortcutKey={shortcutKey}>
      Pause(x)
    </Button>
  );
};

const AddRegion = ({ onClickHandler, shortcutKey }: RegionAction) => {
  return (
    <Button onClickHandler={onClickHandler} shortcutKey={shortcutKey}>
      Add(a)
    </Button>
  );
};

const DeleteRegion = ({ onClickHandler, shortcutKey }: RegionAction) => {
  return (
    <Button onClickHandler={onClickHandler} shortcutKey={shortcutKey}>
      Delete(d)
    </Button>
  );
};

const ResizeRegion = ({ onClickHandler, shortcutKey }: RegionAction) => {
  return (
    <Button onClickHandler={onClickHandler} shortcutKey={shortcutKey}>
      Resize(r)
    </Button>
  );
};

const TrimLeft = ({ onClickHandler, shortcutKey }: RegionAction) => {
  return (
    <Button onClickHandler={onClickHandler} shortcutKey={shortcutKey}>
      LTrim(c)
    </Button>
  );
};

const TrimRight = ({ onClickHandler, shortcutKey }: RegionAction) => {
  return (
    <Button onClickHandler={onClickHandler} shortcutKey={shortcutKey}>
      RTrim(v)
    </Button>
  );
};

interface SegmentPlayActionsProps {
  prevRegion: ClickAction;
  playRegion: ClickAction;
  pauseRegion: ClickAction;
  nextRegion: ClickAction;
}

export const SegmentPlayActions = ({
  prevRegion,
  playRegion,
  pauseRegion,
  nextRegion,
}: SegmentPlayActionsProps) => {
  return (
    <div className="m-auto mb-3 text-center">
      <PreviousRegion onClickHandler={prevRegion} shortcutKey="q" />
      <PlayRegion onClickHandler={playRegion} shortcutKey="z" />
      <PauseRegion onClickHandler={pauseRegion} shortcutKey="x" />
      <NextRegion onClickHandler={nextRegion} shortcutKey="w" />
    </div>
  );
};

interface SegmentUpdateActionsProps {
  addRegion: ClickAction;
  deleteRegion: ClickAction;
  resizeRegion: ClickAction;
}

export const SegmentUpdateActions = ({
  addRegion,
  deleteRegion,
  resizeRegion,
}: SegmentUpdateActionsProps) => {
  return (
    <div className="m-auto mb-3 text-center">
      <AddRegion onClickHandler={addRegion} shortcutKey="a" />
      <DeleteRegion onClickHandler={deleteRegion} shortcutKey="d" />
      <ResizeRegion onClickHandler={resizeRegion} shortcutKey="r" />
    </div>
  );
};


interface SegmentTrimActionsProps {
  trimSilenceOnLeft: ClickAction
  trimSilenceOnRight: ClickAction
}
export const SegmentTrimActions = ({
  trimSilenceOnLeft,
  trimSilenceOnRight
}: SegmentTrimActionsProps) => {
  return (<div className="m-auto mb-3 text-center">
    <TrimLeft onClickHandler={trimSilenceOnLeft} shortcutKey="c" />
    <TrimRight onClickHandler={trimSilenceOnRight} shortcutKey="v" />
  </div>)
}
