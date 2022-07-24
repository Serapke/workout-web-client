import React from 'react';
import { getExercise, getBodyParts, updateExercise } from 'services/exercise';
import { Exercise, BodyPart } from 'store/types';
import { Box, Typography } from '@material-ui/core';
import ExerciseForm, { FormState, EMPTY_FORM, formFromExercise } from '../components/exercise-form';
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

const ExerciseEditPage: React.FunctionComponent = () => {
  const [exercise, setExercise] = React.useState<Exercise>();
  const [bodyParts, setBodyParts] = React.useState<BodyPart[]>();
  const [form, setForm] = React.useState<FormState>(exercise ? formFromExercise(exercise) : EMPTY_FORM);

  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    getExercise(id)
      .then((exercise) => {
        setExercise(exercise);
        setForm(formFromExercise(exercise));
      });
    getBodyParts()
      .then(bodyParts => setBodyParts(bodyParts));
  }, [id]);


  if (!exercise) return <div>Loading...</div>;

  const onFormSubmit = (exercise: Exercise) => {
    exercise.id = id;
    updateExercise(exercise)
      .then(() => navigate(`/exercise/${id}`))
      .catch(errors => console.error(errors));
  }

  return (
    <Box>
      <Typography variant="h4">{exercise.title} - Edit</Typography>
      <ExerciseForm form={form} bodyParts={bodyParts} updateForm={setForm} onSubmit={onFormSubmit}/>
    </Box>
  )
}

export default ExerciseEditPage;