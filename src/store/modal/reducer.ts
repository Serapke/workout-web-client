import { Reducer } from "redux";
import { ModalActions, ModalState, ModalActionType } from "./types";

export const initialState: ModalState = {
  type: null,
  props: null,
  result: null
};

const reducer: Reducer<ModalState> = (state: ModalState = initialState, action: ModalActions) => {
  switch (action.type) {
    case ModalActionType.MODAL_RESULT_PROVIDED:
      return { ...state, result: action.result };
    case ModalActionType.MODAL_SHOWN:
      return { ...state, type: action.modalType, props: action.props };
    case ModalActionType.MODAL_HIDDEN:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
