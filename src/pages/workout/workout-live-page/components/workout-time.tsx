import { Box, createStyles, IconButton, makeStyles } from '@material-ui/core';
import React, { useContext } from 'react';
import Stopwatch from 'components/stopwatch';
import { PauseCircleFilled, PlayCircleFilled } from '@material-ui/icons';
import { LiveWorkoutContext } from "../../../../context/live-workout-context";
import { updateWorkoutDuration } from "../../../../services/live-workout";

const useStyles = makeStyles(() =>
  createStyles({
    largeIcon: {
      fontSize: "2.5em"
    }
  })
)

const WorkoutTime = () => {
  const classes = useStyles();
  const {
    liveWorkout,
    setInExitState,
    paused,
    setPaused,
    duration,
    setDuration
  } = useContext(LiveWorkoutContext);

  function updateDuration(duration: number) {
    if (duration !== 0 && duration % 10 === 0) {
      updateWorkoutDuration(liveWorkout.id, duration);
    }

    setDuration(duration);
  }

  function onPauseClick() {
    setPaused(prevState => !prevState);
    setInExitState(prevState => !prevState);
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box fontSize={20} borderRadius={4} bgcolor="secondary.main" py={1} px={1.5} width="fit-content" height="fit-content">
        <Stopwatch startCounter={duration} paused={paused} doOnEverySecond={updateDuration} />
      </Box>
      <IconButton aria-label="pause" color="secondary" onClick={onPauseClick} edge="end">
        {paused ? <PlayCircleFilled className={classes.largeIcon} /> : <PauseCircleFilled className={classes.largeIcon} />}
      </IconButton>
    </Box>
  )
}

export default WorkoutTime;