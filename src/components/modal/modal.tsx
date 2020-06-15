import * as React from "react";
import { connect } from "react-redux";

import { CommonDialogActions } from "./types";
import { DialogStateProps, ModalState } from "../../store/modal/types";
import WorkoutTitleEditingDialog from "../dialogs/workout-title-editing-dialog";
import SetEditingDialog from "../dialogs/set-editing-dialog";
import { ApplicationState } from "../../store";
import { hideModal } from "../../store/modal/actions";

type OwnProps = CommonDialogActions & {
  type: string;
  props: DialogStateProps;
};

export const ModalType = {
  SetEditingDialog: "SET_EDITING_DIALOG",
  WorkoutTitleEditingDialog: "WORKOUT_TITLE_EDITING_DIALOG",
};

const MODAL_COMPONENTS: { [key: string]: React.FC<any> } = {
  [ModalType.SetEditingDialog]: SetEditingDialog,
  [ModalType.WorkoutTitleEditingDialog]: WorkoutTitleEditingDialog,
};

const Modal = ({ type, props, hide }: OwnProps) => {
  if (!type) {
    return null;
  }
  const SpecificModal = MODAL_COMPONENTS[type];
  return <SpecificModal {...props} hide={hide} />;
};

const mapStateToProps = (state: ApplicationState): ModalState => state.modal;

const mapDispatchToProps = {
  hide: hideModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
