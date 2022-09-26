import * as React from "react";
import { Box, createStyles, makeStyles, Typography } from '@material-ui/core';
import { exerciseMeasurementTypeToLetter, exerciseTypeToWord as exerciseMeasurementTypeToWord } from 'utils/common';
import { FitnessCenter, Info } from '@material-ui/icons';
import CircleItem from 'components/circle-item';
import Timer from 'components/timer';
import { Exercise, MeasurementType, Task } from 'store/types';
import ExerciseDetailsDialog from 'components/exercise/exercise-details-dialog';

interface OwnProps {
  task: Task;
  setIndex: number;
  paused: boolean;
  togglePause: () => void;
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

const ExerciseState = ({ task, setIndex, paused, togglePause }: OwnProps) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [openedExercise, setOpenedExercise] = React.useState<Exercise>(null);

  const handleClickOpen = (exercise: Exercise) => () => {
    togglePause();
    setOpenedExercise(exercise);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenedExercise(null);
    togglePause();
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box onClick={handleClickOpen(task.exercise)} border="6px solid" borderColor="secondary.main" borderRadius="8px" p={4} position="relative">
          <Box position="absolute" right="6px" top="6px">
            <Info fontSize="large" />
          </Box>
          <FitnessCenter style={{ fontSize: 100 }} />
        </Box>
        {task.exercise.measurementType === MeasurementType.TIMED && <Box mt={1}><Timer key={setIndex} seconds={task.sets[setIndex]} paused={paused} /></Box>}
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
        <Typography variant="h5" gutterBottom>{task.sets[setIndex]} {exerciseMeasurementTypeToWord(task.exercise.measurementType, task.sets[setIndex])}</Typography>
        <Typography onClick={handleClickOpen(task.exercise)} variant="h4" className={classes.exercise}>{task.exercise.title}</Typography>
        <Box display="flex" mt={1} className={classes.setBox}>
          {task.sets.map((setGoal, sIndex) =>
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
      <ExerciseDetailsDialog open={open} handleClose={handleClose} exercise={openedExercise} />
    </Box >
  )
}

export default ExerciseState;