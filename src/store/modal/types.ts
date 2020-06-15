import { Action } from "redux";
import { Task } from "../types";

export enum ActionType {
  ADD = "add",
  UPDATE = "update",
}
export interface SetEditingDialogProps {
  action: ActionType;
  task: Task;
  index?: number;
}

export type DialogStateProps = SetEditingDialogProps;

export interface ModalState {
  type: string;
  props?: DialogStateProps;
  result?: any;
}

export enum ModalActionType {
  MODAL_HIDDEN = "@@modal/MODAL_HIDDEN",
  MODAL_SHOWN = "@@modal/MODAL_SHOWN",
  MODAL_RESULT_PROVIDED = "@@modal/MODAL_RESULT_PROVIDED",
}

export interface ModalShownAction extends Action {
  type: ModalActionType.MODAL_SHOWN;
  modalType: string;
  props: DialogStateProps;
}

export interface ModalHiddenAction extends Action {
  type: ModalActionType.MODAL_HIDDEN;
}

export interface ModalResultProvided extends Action {
  type: ModalActionType.MODAL_RESULT_PROVIDED;
  result: any;
}

export type ModalActions = ModalHiddenAction | ModalShownAction | ModalResultProvided;
