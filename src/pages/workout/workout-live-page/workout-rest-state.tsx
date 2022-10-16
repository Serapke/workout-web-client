import * as React from "react";
import { useContext } from "react";
import { Box, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import Timer from 'components/timer';
import CircleItem from 'components/circle-item';
import { exerciseMeasurementTypeToLetter } from 'utils/common';
import ExerciseDetailsDialog from 'components/exercise/exercise-details-dialog';
import { Exercise } from 'store/types';
import { FitnessCenter, Info } from '@material-ui/icons';
import { LiveWorkoutContext } from "../../../context/live-workout-context";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      width: "100%",
      display: "flex",
      border: "1px solid #909090",
      borderRadius: theme.spacing(1),
      marginTop: theme.spacing(2),
      overflow: "hidden",
    },
    cardIcon: {
      width: "100px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.palette.primary.main,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      position: "relative",
    },
    icon: {
      color: theme.palette.primary.contrastText,
    },
    nextUp: {
      color: "#777",
    },
    setBox: {
      "&>*": {
        margin: "0 4px",
      }
    },
  })
)

const WorkoutRestState = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [openedExercise, setOpenedExercise] = React.useState<Exercise>(null);

  const {
    liveWorkout: { nextTask, rest },
    paused,
  } = useContext(LiveWorkoutContext);

  const handleClickOpen = (exercise: Exercise) => () => {
    setOpenedExercise(exercise);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenedExercise(null);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-evenly" width={200} height={200} borderRadius="50%" border="6px solid" borderColor="secondary.main">
        <Timer title="Rest" seconds={rest} paused={paused} increaseBy={5} />
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" marginTop={3} width="100%">
        <Typography variant="subtitle1" className={classes.nextUp}>Next up</Typography>
        <Box onClick={handleClickOpen(nextTask.exercise)} className={classes.card}>
          <Box className={classes.cardIcon}>
            <Box position="absolute" right="6px" top="8px">
              <Info className={classes.icon} />
            </Box>
            {
              nextTask.exercise.imageUrl
                ? <img src={nextTask.exercise.imageUrl} alt={nextTask.exercise.title} width={100}/>
                : <FitnessCenter className={classes.icon} style={{ fontSize: 50 }}/>
            }
          </Box>
          <Box display="flex" flexDirection="column" p={2}>
            <Typography variant="h4">{nextTask.exercise.title}</Typography>
            <Box display="flex" mt={1} className={classes.setBox}>
              {nextTask.sets.map((setGoal, sIndex) => <CircleItem key={`set-goal-${sIndex}`} size="medium" color="secondary">{setGoal}{exerciseMeasurementTypeToLetter(nextTask.exercise.measurementType)}</CircleItem>)}
            </Box>
          </Box>
        </Box>
      </Box>
      <ExerciseDetailsDialog open={open} handleClose={handleClose} exercise={openedExercise} />
    </Box>
  )
}

export default WorkoutRestState;