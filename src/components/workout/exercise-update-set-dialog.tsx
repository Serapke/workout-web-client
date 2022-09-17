import * as React from "react";
import { useEffect } from "react";
import { Button, DialogActions, DialogContent, TextField, } from "@material-ui/core";
import Dialog from "../dialogs/dialog";

const ExerciseUpdateSetDialog = ({ open, initialRepetitions, onClose, onUpdate, onDelete }: OwnProps) => {
  const [repetitions, setRepetitions] = React.useState<number>(initialRepetitions);

  useEffect(() => {
    setRepetitions(initialRepetitions);
  }, [initialRepetitions]);

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepetitions(parseInt(e.target.value));
  };

  return (
    <Dialog open={open} title="Change repetitions" handleClose={onClose} fixedToBottom>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Repetitions"
          type="number"
          defaultValue={repetitions}
          onChange={onValueChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onDelete()} color="primary">
          Delete
        </Button>
        <Button onClick={() => onUpdate(repetitions)} color="primary" autoFocus>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

interface OwnProps {
  open: boolean;
  initialRepetitions: number;
  onClose: () => void;
  onUpdate: (repetitions: number) => void;
  onDelete: () => void;
}

export default ExerciseUpdateSetDialog;
