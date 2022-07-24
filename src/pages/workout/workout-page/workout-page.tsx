import * as React from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { Typography, Button, Box, makeStyles, Theme, createStyles, Chip, Fab } from "@material-ui/core";
import { Workout } from "../../../store/types";
import { getWorkout, deleteWorkout } from "../../../services/workout";
import { ApplicationState } from "../../../store";
import { Edit, Delete } from '@material-ui/icons';
import TaskList from './components/task-list';
import { useParams } from "react-router";

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

const WorkoutPage: React.FunctionComponent<void> = () => {
  const classes = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();
  const [workout, setWorkout] = React.useState<Workout>();

  React.useEffect(() => {
    getWorkout(id).then((workout) => setWorkout(workout));
  }, [id]);

  if (!workout) return <div>Loading...</div>;

  const onStartClick = () => {
    navigate(`/workout/${id}/live`);
  }

  const onDeleteClick = () => {
    deleteWorkout(id)
      .then(() => navigate('/'));
  }

  return (
    <div>
      <Box className={classes.header} display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4">{workout.title}</Typography>
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
          Rest between exercises: <Chip label={`${workout.restPeriodInSeconds} seconds`}/>
        </Typography>
      </Box>
      <Box>
        <TaskList tasks={workout.tasks} />
      </Box>
      <Fab variant="extended" className={classes.fab} color="secondary" onClick={onStartClick}>Start</Fab>
    </div>
  );
};

const mapStateToProps = ({ form }: ApplicationState) => ({
  form: form.workout.form,
  id: form.workout.id,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutPage);
