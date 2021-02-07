import { makeStyles, Theme, createStyles, Box, IconButton } from '@material-ui/core';
import React from 'react';
import Stopwatch from 'components/stopwatch';
import { PauseCircleFilled, PlayCircleFilled } from '@material-ui/icons';

interface OwnProps {
  duration: number;
  paused: boolean;
  onPauseClick: () => void;
  updateDuration: (duration: number) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    largeIcon: {
      fontSize: "2.5em"
    }
  })
)

const WorkoutTime = ({ duration, paused, onPauseClick, updateDuration }: OwnProps) => {
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box fontSize={20} borderRadius={4} bgcolor="secondary.main" py={1} px={1.5} width="fit-content" height="fit-content">
        <Stopwatch startCounter={duration} paused={paused} doOnEverySecond={updateDuration} />
      </Box>
      <IconButton aria-label="pause" color="secondary" onClick={() => onPauseClick()} edge="end">
        {paused ? <PlayCircleFilled className={classes.largeIcon} /> : <PauseCircleFilled className={classes.largeIcon} />}
      </IconButton>
    </Box>
  )
}

export default WorkoutTime;