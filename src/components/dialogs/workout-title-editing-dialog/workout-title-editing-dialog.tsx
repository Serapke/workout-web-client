import * as React from "react";
import { connect } from "react-redux";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@material-ui/core";
import { updateWorkoutFormRequest } from "../../../store/form/thunks";
import { CommonDialogActions } from "../../modal/types";
import { ApplicationState } from "../../../store";

interface PropsFromState {
  title: string;
}

interface PropsFromDispatch {
  updateForm: typeof updateWorkoutFormRequest;
}

type OwnProps = CommonDialogActions & PropsFromState & PropsFromDispatch;

const WorkoutTitleEditingDialog = ({ title, hide, updateForm }: OwnProps) => {
  const [newTitle, setNewTitle] = React.useState<string>(title);

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const handleConfirm = () => {
    updateForm({ name: "title", state: { value: newTitle, error: "" } });
    hide();
  };

  return (
    <Dialog open={true} fullWidth={true}>
      <DialogTitle>Edit workout title</DialogTitle>
      <DialogContent>
        <TextField autoFocus margin="dense" label="Title" value={newTitle} onChange={onValueChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={hide} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = ({ form }: ApplicationState) => ({
  title: form.workout.form.title.value,
});

const mapDispatchToProps = {
  updateForm: updateWorkoutFormRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutTitleEditingDialog);
