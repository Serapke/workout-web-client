import * as React from "react";
import { useEffect } from "react";
import { Button, DialogActions, DialogContent, TextField, } from "@material-ui/core";
import Dialog from "../dialogs/dialog";

const ExerciseAddSetDialog = ({ open, defaultRepetitions, onClose, onAdd }: OwnProps) => {
  const [repetitions, setRepetitions] = React.useState<number>(defaultRepetitions);

  useEffect(() => {
    setRepetitions(defaultRepetitions);
  }, [defaultRepetitions]);

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepetitions(parseInt(e.target.value));
  };

  return (
    <Dialog open={open} title="Add repetitions" handleClose={onClose} fixedToBottom>
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
        <Button onClick={() => onAdd(repetitions)} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

interface OwnProps {
  open: boolean;
  defaultRepetitions: number;
  onClose: () => void;
  onAdd: (repetitions: number) => void;
}

export default ExerciseAddSetDialog;
