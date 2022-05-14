import React from "react";

type ClickAction = () => void;
interface Action {
  onClickHandler: ClickAction;
}
interface RegionAction extends Action {
  children?: React.ReactNode;
}

const Button = ({ children, onClickHandler }: RegionAction) => (
  <button className="btn btn-secondary mx-2" onClick={onClickHandler}>
    {children}
  </button>
);

const PreviousRegion = ({ onClickHandler }: RegionAction) => {
  return <Button onClickHandler={onClickHandler}>Prev</Button>;
};

const NextRegion = ({ onClickHandler }: RegionAction) => {
  return <Button onClickHandler={onClickHandler}>Next</Button>;
};

const PlayRegion = ({ onClickHandler }: RegionAction) => {
  return <Button onClickHandler={onClickHandler}>Play</Button>;
};

const PauseRegion = ({ onClickHandler }: RegionAction) => {
  return <Button onClickHandler={onClickHandler}>Pause</Button>;
};

const AddRegion = ({ onClickHandler }: RegionAction) => {
  return <Button onClickHandler={onClickHandler}>Add</Button>;
};

const DeleteRegion = ({ onClickHandler }: RegionAction) => {
  return <Button onClickHandler={onClickHandler}>Delete</Button>;
};

const ResizeRegion = ({ onClickHandler }: RegionAction) => {
  return <Button onClickHandler={onClickHandler}>Resize</Button>;
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
      <PreviousRegion onClickHandler={prevRegion} />
      <PlayRegion onClickHandler={playRegion} />
      <PauseRegion onClickHandler={pauseRegion} />
      <NextRegion onClickHandler={nextRegion} />
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
      <AddRegion onClickHandler={addRegion} />
      <DeleteRegion onClickHandler={deleteRegion} />
      <ResizeRegion onClickHandler={resizeRegion} />
    </div>
  );
};
