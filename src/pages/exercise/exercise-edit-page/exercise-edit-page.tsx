import React from 'react';
import { getExercise, getBodyParts, updateExercise } from 'services/exercise';
import { RouteComponentProps } from 'react-router-dom';
import { Exercise, BodyPart } from 'store/types';
import { Box, Typography } from '@material-ui/core';
import ExerciseForm, { FormState, EMPTY_FORM, formFromExercise } from '../components/exercise-form';

interface RouteParams {
  id: string;
}

type OwnProps = RouteComponentProps<RouteParams>;

const ExerciseEditPage: React.FunctionComponent<OwnProps> = ({ match, history }) => {
  const [exercise, setExercise] = React.useState<Exercise>();
  const [bodyParts, setBodyParts] = React.useState<BodyPart[]>();
  const [form, setForm] = React.useState<FormState>(exercise ? formFromExercise(exercise) : EMPTY_FORM);

  React.useEffect(() => {
    getExercise(match.params.id).then((exercise) => {
      setExercise(exercise);
      setForm(formFromExercise(exercise));
    });
    getBodyParts().then(bodyParts => setBodyParts(bodyParts));
  }, [match.params.id]);


  if (!exercise) return <div></div>;

  const onFormSubmit = (exercise: Exercise) => {
    exercise.id = match.params.id;
    updateExercise(exercise).then((res) => {
      if (res.errors) {
        console.error(res.errors);
      } else {
        history.push(`/exercise/${match.params.id}`);
      }
    });
  }

  return (
    <Box>
      <Typography variant="h4">{exercise.title} - Edit</Typography>
      <ExerciseForm form={form} bodyParts={bodyParts} updateForm={setForm} onSubmit={onFormSubmit} />
    </Box>
  )
}

export default ExerciseEditPage;