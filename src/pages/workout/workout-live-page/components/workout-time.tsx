import { makeStyles, Theme, createStyles, Box, IconButton } from '@material-ui/core';
import React from 'react';
import Stopwatch from 'components/stopwatch';
import { PauseCircleFilled, PlayCircleFilled } from '@material-ui/icons';

interface OwnProps {
  paused: boolean;
  onPauseClick: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    largeIcon: {
      fontSize: "2.5em"
    }
  })
)

const WorkoutTime = ({ paused, onPauseClick }: OwnProps) => {
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Stopwatch paused={paused} />
      <IconButton aria-label="pause" color="secondary" onClick={() => onPauseClick()} edge="end">
        {paused ? <PlayCircleFilled className={classes.largeIcon} /> : <PauseCircleFilled className={classes.largeIcon} />}
      </IconButton>
    </Box>
  )
}

export default WorkoutTime;