import React from 'react';
import { Dialog, DialogTitle, Box, Button, makeStyles, createStyles } from '@material-ui/core';

interface OwnProps {
  open: boolean;
  onContinue: () => void;
  onExit: () => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      borderRadius: 0,
      padding: "20px 0",
    }
  })
);

const ExitLiveWorkoutDialog = ({ open, onContinue, onExit }: OwnProps) => {
  const classes = useStyles();
  return (
    <Dialog open={open}>
      <DialogTitle>Workout paused</DialogTitle>
      <Box>
        <Button onClick={onContinue} variant="contained" color="secondary" fullWidth className={classes.button}>Continue</Button>
        <Button onClick={onExit} variant="contained" color="primary" fullWidth className={classes.button}>Exit and discard</Button>
      </Box>
    </Dialog>
  )
}

export default ExitLiveWorkoutDialog;