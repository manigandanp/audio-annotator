import React from "react";
import { RegionAction, Button, ClickAction } from "./RegionButton";

const PreviousRegion = ({ onClickHandler, shortcutKey }: RegionAction) => {
  return (
    <Button onClickHandler={onClickHandler} shortcutKey={shortcutKey}>
      Prev
    </Button>
  );
};

const NextRegion = ({ onClickHandler, shortcutKey }: RegionAction) => {
  return (
    <Button onClickHandler={onClickHandler} shortcutKey={shortcutKey}>
      Next
    </Button>
  );
};

const PlayRegion = ({ onClickHandler, shortcutKey }: RegionAction) => {
  return (
    <Button onClickHandler={onClickHandler} shortcutKey={shortcutKey}>
      Play
    </Button>
  );
};

const PauseRegion = ({ onClickHandler, shortcutKey }: RegionAction) => {
  return (
    <Button onClickHandler={onClickHandler} shortcutKey={shortcutKey}>
      Pause
    </Button>
  );
};

const AddRegion = ({ onClickHandler, shortcutKey }: RegionAction) => {
  return (
    <Button onClickHandler={onClickHandler} shortcutKey={shortcutKey}>
      Add
    </Button>
  );
};

const DeleteRegion = ({ onClickHandler, shortcutKey }: RegionAction) => {
  return (
    <Button onClickHandler={onClickHandler} shortcutKey={shortcutKey}>
      Delete
    </Button>
  );
};

const ResizeRegion = ({ onClickHandler, shortcutKey }: RegionAction) => {
  return (
    <Button onClickHandler={onClickHandler} shortcutKey={shortcutKey}>
      Resize
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
