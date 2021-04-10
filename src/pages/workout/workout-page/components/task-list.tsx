import React from "react";
import { Task, Exercise } from 'store/types';
import { List, ListItem, Box, makeStyles, Theme, createStyles, Typography } from '@material-ui/core';
import { FitnessCenter, Info } from '@material-ui/icons';
import CircleItem from 'components/circle-item';
import { exerciseMeasurementTypeToLetter } from 'utils/common';
import ExerciseDialog from 'components/exercise/exercise-dialog';

interface OwnProps {
  tasks: Task[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      width: "100%",
      display: "flex",
      border: "1px solid #909090",
      borderRadius: theme.spacing(1),
      overflow: "hidden",
    },
    cardIcon: {
      width: "75px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.palette.primary.main,
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      position: "relative",
    },
    icon: {
      color: theme.palette.primary.contrastText,
    },
    list: {
      width: '100%',
    },
    setBox: {
      "&>*": {
        margin: "0 4px",
      }
    },
  })
)

const TaskList = ({ tasks }: OwnProps) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openedExercise, setOpenedExercise] = React.useState<Exercise>(null);

  const handleClickOpen = (exercise: Exercise) => () => {
    setOpenedExercise(exercise);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenedExercise(null);
  };

  return (
    <React.Fragment>
      <List>
        {
          tasks && tasks.map((task, tIndex) => {
            return (
              <ListItem key={tIndex} onClick={handleClickOpen(task.exercise)} disableGutters>
                <Box className={classes.card}>
                  <Box className={classes.cardIcon}>
                    <Box position="absolute" right="6px" top="8px">
                      <Info className={classes.icon} style={{ fontSize: 14 }} />
                    </Box>
                    <FitnessCenter className={classes.icon} style={{ fontSize: 50 }} />
                  </Box>
                  <Box display="flex" flexDirection="column" px={2} py={1}>
                    <Typography variant="h6">{task.exercise.title}</Typography>
                    <Box display="flex" mt={0.5} className={classes.setBox}>
                      {task.sets.map((set, sIndex) => <CircleItem key={`set-goal-${sIndex}`} size="small" color="secondary">{set}{exerciseMeasurementTypeToLetter(task.exercise.measurementType)}</CircleItem>)}
                    </Box>
                  </Box>
                </Box>
              </ListItem>
            )
          })
        }
      </List>
      <ExerciseDialog open={open} handleClose={handleClose} exercise={openedExercise} />
    </React.Fragment>
  )
}

export default TaskList;