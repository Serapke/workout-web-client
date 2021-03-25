import * as React from "react";
import { RouteComponentProps, Link } from 'react-router-dom';
import { Box, Typography, Button, makeStyles, Theme, createStyles } from '@material-ui/core';
import { getAllExercises } from 'services/exercise';
import { Exercise } from 'store/types';
import ExerciseList from './components/exercise-list';
import { AddCircleOutline } from '@material-ui/icons';

type AllProps = RouteComponentProps & {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      marginBottom: theme.spacing(2),
    },
  })
);

const ExercisesPage: React.FunctionComponent<AllProps> = ({ history }) => {
  const classes = useStyles();
  const [exercises, setExercises] = React.useState<Exercise[]>([]);

  React.useEffect(() => {
    getAllExercises().then((exercises) => setExercises(exercises));
  }, [])

  const onExerciseClick = (id: string) => {
    history.push(`/exercise/${id}`);
  }

  return (
    <Box>
      <Box className={classes.header} display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4">Exercises</Typography>
        <Button color="secondary" component={Link} to={`/exercise/create`} startIcon={<AddCircleOutline />}>
          ADD
        </Button>
      </Box>
      <ExerciseList exercises={exercises} onExerciseClick={onExerciseClick} />
    </Box>
  )
}

export default ExercisesPage;