import { RouteComponentProps, Link } from 'react-router-dom';
import React from 'react';
import { Box, Typography, createStyles, makeStyles, Theme, Button } from '@material-ui/core';
import { getExercise, deleteExercise } from 'services/exercise';
import { Exercise } from 'store/types';
import { Edit, Delete } from '@material-ui/icons';

interface RouteParams {
  id: string;
}

type AllProps = RouteComponentProps<RouteParams>;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      marginBottom: theme.spacing(2),
    },
    fieldBox: {
      marginBottom: theme.spacing(1),
    },
  })
);

const ExercisePage: React.FunctionComponent<AllProps> = ({ match, history }) => {
  const classes = useStyles();
  const [exercise, setExercise] = React.useState<Exercise>();

  React.useEffect(() => {
    getExercise(match.params.id).then((exercise) => setExercise(exercise));
  }, [match.params.id]);

  if (!exercise) return <div></div>;

  const onDeleteClick = () => {
    deleteExercise(match.params.id);
    history.push('/exercises');
  }

  return (
    <Box>
      <Box className={classes.header} display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4">{exercise.title}</Typography>
        <Box>
          <Button color="secondary" component={Link} to={`/exercise/${match.params.id}/edit`} startIcon={<Edit />}>
            EDIT
          </Button>
          <Button color="secondary" onClick={onDeleteClick} startIcon={<Delete />}>
            DELETE
          </Button>
        </Box>
      </Box>
      <Box className={classes.fieldBox}>
        <Typography variant="subtitle2">Description:</Typography>
        <Typography variant="body1">Starting position: {exercise.description.startingPosition}</Typography>
        <Box pl={2} pt={1}>
          {exercise.description.steps.map((step, stepIndex) => <Typography variant="body1">{stepIndex + 1}. {step}</Typography>)}
        </Box>
      </Box>
      <Box className={classes.fieldBox}>
        <Typography variant="subtitle2">Default quantity:</Typography>
        <Typography variant="body1">{exercise.defaultQuantity}</Typography>
      </Box>
      <Box className={classes.fieldBox}>
        <Typography variant="subtitle2">Measurement type:</Typography>
        <Typography variant="body1">{exercise.measurementType}</Typography>
      </Box>
      <Box className={classes.fieldBox}>
        <Typography variant="subtitle2">Body parts:</Typography>
        <Typography variant="body1">{exercise.bodyParts.map(bodyPart => bodyPart + " ")}</Typography>
      </Box>
    </Box>
  )
}

export default ExercisePage;