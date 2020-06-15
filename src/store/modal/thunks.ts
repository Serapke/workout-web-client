import { ApplicationState } from "..";
import { ModalActions, ModalState } from "./types";
import { ThunkAction } from "redux-thunk";
import { showModal, hideModal } from "./actions";

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, ApplicationState, unknown, ModalActions>;

export const showModalRequest = (state: ModalState): AppThunk => dispatch => {
  dispatch(showModal(state));
};

export const hideModalRequest = (): AppThunk => dispatch => {
  dispatch(hideModal());
};
