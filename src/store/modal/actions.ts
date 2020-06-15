import { ActionCreator } from "redux";

import { ModalActionType, ModalHiddenAction, ModalShownAction } from "./types";

export const showModal: ActionCreator<ModalShownAction> = ({ type, props }) => ({
  type: ModalActionType.MODAL_SHOWN,
  modalType: type,
  props
});

export const hideModal: ActionCreator<ModalHiddenAction> = () => ({
  type: ModalActionType.MODAL_HIDDEN
});
