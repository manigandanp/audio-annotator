import React from "react";
import KeyboardEventHandler from "react-keyboard-event-handler";

export type ClickAction = () => void;

interface Action {
  onClickHandler: ClickAction;
}
export interface RegionAction extends Action {
  children?: React.ReactNode;
  shortcutKey: string;
}
export const Button = ({
  children,
  onClickHandler,
  shortcutKey,
}: RegionAction) => (
  <>
    <KeyboardEventHandler
      handleKeys={[shortcutKey]}
      onKeyEvent={onClickHandler}
    />
    <button className="btn btn-secondary mx-2" onClick={onClickHandler}>
      {children}
    </button>
  </>
);
