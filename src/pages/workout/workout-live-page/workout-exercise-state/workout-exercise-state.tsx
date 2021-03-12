import * as React from "react";
import { makeStyles, createStyles, Typography, Box } from '@material-ui/core';
import { TaskStatus } from 'services/types';
import { exerciseTypeToWord, exerciseMeasurementTypeToLetter } from 'utils/common';
import { FitnessCenter } from '@material-ui/icons';
import CircleItem from 'components/circle-item';
import Timer from 'components/timer';

interface OwnProps {
  task: TaskStatus;
  setIndex: number;
  paused: boolean;
}

const useStyles = makeStyles(() =>
  createStyles({
    exercise: {
      color: "#666",
    },
    setBox: {
      "&>*": {
        margin: "0 4px",
      }
    },
  })
);

const ExerciseState = ({ task, setIndex, paused }: OwnProps) => {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box border="6px solid" borderColor="secondary.main" borderRadius="50%" p={4}>
          <FitnessCenter style={{ fontSize: 100 }} />
        </Box>
        {task.exercise.measurementType === "TIMED" && <Box mt={1}><Timer seconds={task.setsGoal[setIndex]} paused={paused} /></Box>}
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
        <Typography variant="h5" gutterBottom>{task.setsGoal[setIndex]} {exerciseTypeToWord(task.exercise.measurementType, task.setsGoal[setIndex])}</Typography>
        <Typography variant="h4" className={classes.exercise}>{task.exercise.title}</Typography>
        <Box display="flex" mt={1} className={classes.setBox}>
          {task.setsGoal.map((setGoal, sIndex) =>
            <CircleItem
              key={`set-goal-${sIndex}`}
              size="medium"
              color={sIndex < setIndex ? "secondary" : "primary"}
              outlined={sIndex >= setIndex}>
              {setGoal}{exerciseMeasurementTypeToLetter(task.exercise.measurementType)}
            </CircleItem>
          )}
        </Box>
      </Box>
    </Box >
  )
}

export default ExerciseState;