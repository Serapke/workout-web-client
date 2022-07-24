import * as React from "react";
import { Typography, Box } from "@material-ui/core";
import { Exercise, BodyPart } from "../../../store/types";
import { createExercise, getBodyParts } from "../../../services/exercise";
import ExerciseForm, { EMPTY_FORM, FormState } from '../components/exercise-form';
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";


const ExerciseCreatePage = () => {
  const [bodyParts, setBodyParts] = React.useState<BodyPart[]>();
  const [form, setForm] = React.useState<FormState>(EMPTY_FORM);

  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    getBodyParts()
      .then(bodyParts => setBodyParts(bodyParts));
  }, [id]);

  const onFormSubmit = (exercise: Exercise) => {
    createExercise(exercise)
      .then(() => navigate(-1))
      .catch(errors => console.error(errors));
  };

  return (
    <Box>
      <Typography variant="h4">Create exercise</Typography>
      <ExerciseForm form={form} bodyParts={bodyParts} updateForm={setForm} onSubmit={onFormSubmit} />
    </Box>
  );
};
export default ExerciseCreatePage;
