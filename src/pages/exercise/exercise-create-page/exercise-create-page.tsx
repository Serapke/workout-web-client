import * as React from "react";
import { Typography, Box } from "@material-ui/core";
import { RouteComponentProps } from "react-router-dom";
import { Exercise, BodyPart } from "../../../store/types";
import { createExercise, getBodyParts } from "../../../services/exercise";
import ExerciseForm, { EMPTY_FORM, FormState } from '../components/exercise-form';

interface RouteParams {
  id: string;
}

type OwnProps = RouteComponentProps<RouteParams>;

const ExerciseCreatePage = ({ match, history }: OwnProps) => {
  const [bodyParts, setBodyParts] = React.useState<BodyPart[]>();
  const [form, setForm] = React.useState<FormState>(EMPTY_FORM);

  React.useEffect(() => {
    getBodyParts().then(bodyParts => setBodyParts(bodyParts));
  }, [match.params.id]);

  const onFormSubmit = (exercise: Exercise) => {
    createExercise(exercise).then((res) => {
      if (res.errors) {
        setForm((prevState) =>
          Object.entries(prevState).reduce((newState, [field, value]) => {
            newState[field as keyof FormState] = value;
            newState[field as keyof FormState].errorMessage = res.errors[field] as string;
            return newState;
          }, {} as FormState)
        );
      } else {
        history.goBack();
      }
    });
  };

  return (
    <Box>
      <Typography variant="h4">Create exercise</Typography>
      <ExerciseForm form={form} bodyParts={bodyParts} updateForm={setForm} onSubmit={onFormSubmit} />
    </Box>
  );
};
export default ExerciseCreatePage;
