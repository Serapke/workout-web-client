import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, Link } from "react-router-dom";
import { Typography, Button, Box, makeStyles, Theme, createStyles, Chip } from "@material-ui/core";
import { Workout } from "../../../store/types";
import { getWorkout } from "../../../services/workout";
import TaskList from "../../../components/task-list";
import { ApplicationState } from "../../../store";

interface RouteParams {
  id: string;
}

type AllProps = RouteComponentProps<RouteParams>;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      marginBottom: theme.spacing(2),
    },
    restBox: {
      marginBottom: theme.spacing(2),
    },
  })
);

const WorkoutPage: React.FunctionComponent<AllProps> = ({ match }) => {
  const classes = useStyles();
  const [workout, updateWorkout] = React.useState<Workout>();

  React.useEffect(() => {
    getWorkout(match.params.id).then((workout) => updateWorkout(workout));
  }, [match.params.id]);

  if (!workout) return <div>Loading...</div>;

  return (
    <div>
      <Box className={classes.header} display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4">{workout.title}</Typography>
        <Box>
          <Button color="secondary" component={Link} to={`/workout/${match.params.id}/edit`}>
            EDIT WORKOUT
          </Button>
        </Box>
      </Box>
      <Box className={classes.restBox}>
        <Typography variant="subtitle1" gutterBottom>
          Rest between exercises: <Chip label={`${workout.restPeriodInSeconds} seconds`}></Chip>
        </Typography>
      </Box>
      <Box>
        <TaskList tasks={workout.tasks} />
      </Box>
    </div>
  );
};

const mapStateToProps = ({ form }: ApplicationState) => ({
  form: form.workout.form,
  id: form.workout.id,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutPage);
