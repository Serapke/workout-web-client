import * as React from "react";
import { connect } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Box,
  Typography,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { CommonDialogActions } from "../../modal/types";
import { SetEditingDialogProps, ActionType } from "../../../store/modal/types";
import { updateTaskRequest } from "../../../store/form/thunks";
import { updateObjectInArray, removeItem } from "../../../utils/immutable";

type OwnProps = CommonDialogActions &
  SetEditingDialogProps & {
    updateTask: typeof updateTaskRequest;
  };

const SetEditingDialog = ({ hide, task, index, action, updateTask }: OwnProps) => {
  const [repetitions, setRepetitions] = React.useState<number>();

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepetitions(parseInt(e.target.value));
  };

  const handleConfirm = () => {
    if (action === ActionType.UPDATE) {
      updateTask({
        ...task,
        sets: updateObjectInArray(task.sets, { index, item: repetitions }),
      });
    } else if (action === ActionType.ADD) {
      updateTask({
        ...task,
        sets: [...task.sets, repetitions],
      });
    }
    hide();
  };

  const handleDelete = () => {
    updateTask({
      ...task,
      sets: removeItem(task.sets, { index }),
    });
    hide();
  };

  const showDeleteButton = action === ActionType.UPDATE;

  const getTitle = () => (action === ActionType.UPDATE ? "Change repetitions" : "Add new set");

  return (
    <Dialog open={true} fullWidth={true}>
      <DialogTitle disableTypography>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">{getTitle()}</Typography>
          {showDeleteButton && (
            <IconButton onClick={handleDelete}>
              <Delete />
            </IconButton>
          )}
        </Box>
      </DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Repetitions"
          type="number"
          defaultValue={task.sets[index]}
          onChange={onValueChange}
        />
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

const mapDispatchToProps = {
  updateTask: updateTaskRequest,
};

export default connect(null, mapDispatchToProps)(SetEditingDialog);
