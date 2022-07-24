import * as React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, makeStyles, Theme, createStyles } from '@material-ui/core';
import { getExercises } from 'services/exercise';
import { Exercise } from 'store/types';
import ExerciseList from './components/exercise-list';
import { AddCircleOutline } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      marginBottom: theme.spacing(2),
    },
  })
);

const ExercisesPage: React.FunctionComponent = () => {
  const classes = useStyles();
  const [exercises, setExercises] = React.useState<Exercise[]>([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    getExercises()
      .then((exercises) => setExercises(exercises));
  }, [])

  const onExerciseClick = (id: string) => {
    navigate(`/exercise/${id}`);
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