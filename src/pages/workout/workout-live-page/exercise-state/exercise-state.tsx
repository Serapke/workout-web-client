import * as React from "react";
import { makeStyles, createStyles, Theme, Typography, Box } from '@material-ui/core';
import { TaskStatus } from 'services/types';

interface OwnProps {
  task: TaskStatus;
  setIndex: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    exercise: {
      color: "#666",
    }
  })
);

const ExerciseState = ({ task, setIndex }: OwnProps) => {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box display="flex" flexDirection="column" alignItems="center" marginTop={15}>
        <Typography variant="h3" gutterBottom>{task.setsGoal[setIndex]} </Typography>
        <Typography variant="h4" className={classes.exercise}>{task.exercise.title}</Typography>
        <Typography variant="h6" color="secondary">{setIndex + 1}/{task.setsGoal.length} sets</Typography>
      </Box>
    </Box>
  )
}

export default ExerciseState;