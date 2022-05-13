import React from "react";

type ClickAction = () => void;
interface Action {
  onClickHandler: ClickAction;
}

interface RegionAction extends Action {
  children: React.ReactNode;
}

interface PrevProps extends Action {}
interface NextProps extends Action {}
interface PlayProps extends Action {}
interface PauseProps extends Action {}

const Button = ({ children, onClickHandler }: RegionAction) => (
  <button className="btn btn-secondary mx-2" onClick={onClickHandler}>
    {children}
  </button>
);

const PreviousRegion = ({ onClickHandler }: PrevProps) => {
  return <Button onClickHandler={onClickHandler}>Prev</Button>;
};

const NextRegion = ({ onClickHandler }: NextProps) => {
  return <Button onClickHandler={onClickHandler}>Next</Button>;
};

const PlayRegion = ({ onClickHandler }: PlayProps) => {
  return <Button onClickHandler={onClickHandler}>Play</Button>;
};

const PauseRegion = ({ onClickHandler }: PauseProps) => {
  return <Button onClickHandler={onClickHandler}>Pause</Button>;
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
