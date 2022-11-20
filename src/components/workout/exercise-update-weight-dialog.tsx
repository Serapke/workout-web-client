import React, { useEffect } from "react";
import Dialog from "../dialogs/dialog";
import { Button, DialogActions, DialogContent, TextField } from "@material-ui/core";

const ExerciseUpdateWeightDialog = ({ open, initialWeight, onClose, onUpdate }: OwnProps) => {
  const [weight, setWeight] = React.useState<number>(initialWeight);

  useEffect(() => {
    setWeight(initialWeight);
  }, [initialWeight]);

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(parseInt(e.target.value));
  };

  return (
    <Dialog title="Change weight" open={open} handleClose={onClose} fixedToBottom>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Weight"
          type="number"
          defaultValue={weight}
          onChange={onValueChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onUpdate(weight)} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

interface OwnProps {
  open: boolean;
  initialWeight: number;
  onClose: () => void;
  onUpdate: (weight: number) => void;
}

export default ExerciseUpdateWeightDialog;