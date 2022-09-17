import * as React from "react";
import { Link, useNavigate } from "react-router-dom"
import { Box, Button, Chip, createStyles, Fab, makeStyles, Theme, Typography } from "@material-ui/core";
import { deleteWorkout } from "../../../services/workout";
import { Delete, Edit } from '@material-ui/icons';
import TaskList from './components/task-list';
import { useParams } from "react-router";
import { useHandleWorkoutDataRequest } from "../../../hooks/use-handle-workout-data-request";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      marginBottom: theme.spacing(2),
    },
    restBox: {
      marginBottom: theme.spacing(2),
    },
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      left: "50%",
      transform: "translateX(-50%)",
      width: "200px",
    }
  })
);

const WorkoutPage = () => {
  const classes = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();
  const workoutRequestData = useHandleWorkoutDataRequest(id);

  if (!workoutRequestData.workout) return <div>Loading...</div>;

  const onStartClick = () => {
    navigate(`/workout/${id}/live`);
  }

  const onDeleteClick = () => {
    deleteWorkout(id)
      .then(() => navigate('/favorites'));
  }

  return (
    <div>
      <Box className={classes.header} display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4">{workoutRequestData.workout.title}</Typography>
        <Box>
          <Button color="secondary" component={Link} to={`/workout/${id}/edit`} startIcon={<Edit />}>
            EDIT
          </Button>
          <Button color="secondary" onClick={onDeleteClick} startIcon={<Delete />}>
            DELETE
          </Button>
        </Box>
      </Box>
      <Box className={classes.restBox}>
        <Typography variant="subtitle1" gutterBottom>
          Rest between exercises: <Chip label={`${workoutRequestData.workout.restPeriodInSeconds} seconds`}/>
        </Typography>
      </Box>
      <Box>
        <TaskList tasks={workoutRequestData.workout.tasks} />
      </Box>
      <Fab variant="extended" className={classes.fab} color="secondary" onClick={onStartClick}>Start</Fab>
    </div>
  );
};

export default WorkoutPage;
