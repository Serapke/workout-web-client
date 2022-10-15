import React, { useContext } from 'react';
import { Box, Button, createStyles, Dialog, DialogTitle, makeStyles } from '@material-ui/core';
import { LiveWorkoutContext } from "../../../../context/live-workout-context";
import { discardLiveWorkout } from "../../../../services/live-workout";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      borderRadius: 0,
      padding: "20px 0",
    }
  })
);

const ExitLiveWorkoutDialog = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const {
    navigationPathname,
    setNavigationPathname,
    liveWorkout: { id },
    inExitState: open,
    setInExitState,
    setPaused,
  } = useContext(LiveWorkoutContext);

  function onContinue() {
    setNavigationPathname(null);
    setPaused(false);
    setInExitState(false);
  }

  function onExit() {
    discardLiveWorkout(id).then(() => {
      // remove live workout link from history, so it won't be impossible to start using "back" button
      navigate(navigationPathname ? navigationPathname : `/favorites`)
    });
  }

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