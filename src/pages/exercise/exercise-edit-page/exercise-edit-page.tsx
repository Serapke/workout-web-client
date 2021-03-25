import React from 'react';
import { getExercise, getBodyParts, updateExercise } from 'services/exercise';
import { RouteComponentProps } from 'react-router-dom';
import { Exercise, BodyPart } from 'store/types';
import { Box, Typography } from '@material-ui/core';
import ExerciseForm, { FormState, EMPTY_FORM } from '../components/exercise-form';

interface RouteParams {
  id: string;
}

type OwnProps = RouteComponentProps<RouteParams>;

const formFromExercise = (exercise: Exercise) => ({
  title: { value: exercise.title, errorMessage: "" },
  description: { value: exercise.description, errorMessage: "" },
  defaultQuantity: { value: exercise.defaultQuantity, errorMessage: "" },
  measurementType: { value: exercise.measurementType, errorMessage: "" },
  bodyParts: { value: exercise.bodyParts, errorMessage: "" },
});

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
        setForm((prevState) =>
          Object.entries(prevState).reduce((newState, [field, value]) => {
            newState[field as keyof FormState] = value;
            newState[field as keyof FormState].errorMessage = res.errors[field] as string;
            return newState;
          }, {} as FormState)
        );
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