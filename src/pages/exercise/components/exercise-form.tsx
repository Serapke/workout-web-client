import React from 'react';
import { TextField, Box, FormGroup, Chip, makeStyles, Typography, Button, MenuItem } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import Fab from 'components/fab';
import { BodyPart, Exercise, MeasurementType, Type } from 'store/types';
import { capitalizeWord } from 'utils/text-utils';
import { fabKeyboardStyles, onInputFocusHideFab, onInputBlurShowFab } from 'utils/ui-utils';
import { updateObjectInArray } from 'utils/immutable';

export interface FieldState {
  value: any;
  errorMessage: string;
}

export interface StringFieldState {
  value: string;
  errorMessage: string;
}

export interface FormState {
  title: StringFieldState;
  description: {
    startingPosition: StringFieldState;
    steps: StringFieldState[];
  };
  type: StringFieldState;
  defaultQuantity: StringFieldState;
  measurementType: StringFieldState;
  bodyParts: FieldState;
}

interface OwnProps {
  form: FormState;
  bodyParts: BodyPart[];
  updateForm: (arg0: any) => void;
  onSubmit: (arg0: Exercise) => void;
}

const useStyles = makeStyles((theme) => ({
  measurementTypeGroup: {
    flexWrap: "nowrap",
  },
  measurementType: {
    marginLeft: theme.spacing(1),
  },
}));

const measurementTypes = [
  { title: "Repetitions", value: MeasurementType.QUANTITATIVE },
  { title: "Seconds", value: MeasurementType.TIMED }
];

const types = Object.keys(Type).map(type => ({
  label: capitalizeWord(type),
  value: type
}));

export const EMPTY_STRING_FIELD = {
  value: "", errorMessage: ""
}

export const EMPTY_FORM: FormState = {
  title: EMPTY_STRING_FIELD,
  description: {
    startingPosition: EMPTY_STRING_FIELD,
    steps: [EMPTY_STRING_FIELD],
  },
  type: { value: Object.keys(Type)[0], errorMessage: "" },
  defaultQuantity: EMPTY_STRING_FIELD,
  measurementType: { value: measurementTypes[0].value, errorMessage: "" },
  bodyParts: { value: [], errorMessage: "" },
};

export const formFromExercise = (exercise: Exercise): FormState => ({
  title: { value: exercise.title, errorMessage: "" },
  description: {
    startingPosition: { value: exercise.description.startingPosition, errorMessage: "" },
    steps: exercise.description ? exercise.description.steps.map(step => ({ value: step, errorMessage: "" })) : [EMPTY_STRING_FIELD]
  },
  type: { value: exercise.type, errorMessage: "" },
  defaultQuantity: { value: String(exercise.defaultQuantity), errorMessage: "" },
  measurementType: { value: exercise.measurementType, errorMessage: "" },
  bodyParts: { value: exercise.bodyParts, errorMessage: "" },
});

const formToExercise = (form: FormState): Exercise => ({
  id: null,
  title: form.title.value,
  description: {
    startingPosition: form.description.startingPosition.value,
    steps: form.description.steps.map(step => step.value),
  },
  type: Type[form.type.value],
  bodyParts: form.bodyParts.value,
  defaultQuantity: +form.defaultQuantity.value,
  measurementType: MeasurementType[form.measurementType.value],
});

const ExerciseForm = ({ form, bodyParts, updateForm, onSubmit }: OwnProps) => {
  const bodyPartsInputRef = React.createRef<HTMLInputElement>();
  const classes = useStyles();
  const fabClass = fabKeyboardStyles();

  const changeFormField = (field: keyof FormState, value: { value?: any; errorMessage: string }) => {
    updateForm((prevState: FormState) => ({ ...prevState, [field]: { ...prevState[field], ...value } }));
  };

  const onTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeFormField(event.target.id as keyof FormState, { value: event.target.value, errorMessage: "" });
  };

  const onStartingPositionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = { value: event.target.value, errorMessage: "" };
    updateForm((prevState: FormState) => ({ ...prevState, description: { ...prevState.description, startingPosition: value } }));
  }

  const onStepChange = (stepIndex: number, value: string) => {
    const action = { item: { value, errorMessage: "" }, index: stepIndex };
    updateForm((prevState: FormState) => ({ ...prevState, description: { ...prevState.description, steps: updateObjectInArray(prevState.description.steps, action) } }));
  }

  const onMeasurementTypeChange = (value: string) => () => {
    changeFormField("measurementType", { value, errorMessage: "" });
  };

  const onTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeFormField("type", { value: event.target.value, errorMessage: "" })
  }

  const onBodyPartsChange = (_event: any, newValue: string[]) => {
    changeFormField("bodyParts", { value: newValue, errorMessage: "" });
  };

  const addStep = () => {
    if (form.description.steps.length > 5 || form.description.steps.some(step => !step.value)) {
      return;
    }
    updateForm((prevState: FormState) => ({ ...prevState, description: { ...prevState.description, steps: [...prevState.description.steps, EMPTY_STRING_FIELD] } }))
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    validate();
    const exercise = formToExercise(form);
    onSubmit(exercise);
  };

  const setFieldError = (field: keyof FormState, errorMessage: string) => {
    changeFormField(field, { errorMessage });
  };

  const validate = () => {
    if (!form.bodyParts.value.length) {
      setFieldError("bodyParts", "Must choose at least 1 body part");
      const node = bodyPartsInputRef.current;
      if (node) {
        node.focus();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box marginTop={2}>
        <TextField
          id="title"
          label="Title"
          value={form.title.value}
          error={!!form.title.errorMessage}
          helperText={form.title.errorMessage}
          onChange={onTextFieldChange}
          color="secondary"
          fullWidth
          InputProps={{
            onFocus: () => onInputFocusHideFab(fabClass.keyboardStyle),
            onBlur: () => onInputBlurShowFab(fabClass.keyboardStyle),
          }}
        />
      </Box>
      <Box display="flex" alignItems="baseline" marginTop={2}>
        <TextField
          id="defaultQuantity"
          label="Quantity"
          value={form.defaultQuantity.value}
          error={!!form.defaultQuantity.errorMessage}
          helperText={form.defaultQuantity.errorMessage}
          onChange={onTextFieldChange}
          color="secondary"
          fullWidth
          InputProps={{
            onFocus: () => onInputFocusHideFab(fabClass.keyboardStyle),
            onBlur: () => onInputBlurShowFab(fabClass.keyboardStyle),
          }}
        />
        <FormGroup className={classes.measurementTypeGroup} row>
          {measurementTypes.map((type) => (
            <Chip
              key={type.value}
              className={classes.measurementType}
              label={type.title}
              color={form.measurementType.value === type.value ? "secondary" : "default"}
              onClick={onMeasurementTypeChange(type.value)}
            />
          ))}
        </FormGroup>
      </Box>
      <Box mt={2}>
        <Autocomplete
          options={bodyParts ? bodyParts : []}
          getOptionLabel={(option) => capitalizeWord(option)}
          multiple
          renderInput={(params: any) => (
            <TextField
              color="secondary"
              {...params}
              variant="standard"
              label="Body parts"
              inputRef={bodyPartsInputRef}
              error={!!form.bodyParts.errorMessage}
              helperText={form.bodyParts.errorMessage}
            />
          )}
          ChipProps={{ color: "secondary" }}
          value={form.bodyParts.value}
          onChange={onBodyPartsChange}
          onOpen={() => onInputFocusHideFab(fabClass.keyboardStyle)}
          onClose={() => onInputBlurShowFab(fabClass.keyboardStyle)}
        />
      </Box>
      <Box mt={2}>
        <TextField
          id="types"
          select
          label="Select"
          error={!!form.type.errorMessage}
          helperText={form.type.errorMessage || "Please select exercise type"}
          value={form.type.value}
          onChange={onTypeChange}
        >
          {
            types.map((type) => (
              <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
            ))
          }
        </TextField>
      </Box>
      <Box marginTop={4}>
        <Typography variant="subtitle2">Description</Typography>
        <TextField
          id="starting_position"
          label="Starting position"
          value={form.description.startingPosition.value}
          error={!!form.description.startingPosition.errorMessage}
          helperText={form.description.startingPosition.errorMessage}
          onChange={onStartingPositionChange}
          color="secondary"
          rowsMax={2}
          multiline
          fullWidth
          InputProps={{
            onFocus: () => onInputFocusHideFab(fabClass.keyboardStyle),
            onBlur: () => onInputBlurShowFab(fabClass.keyboardStyle),
          }}
        />
        {form.description.steps.map((step, stepIndex) => {
          return (
            <TextField
              id={`step${stepIndex}`}
              key={`step${stepIndex}`}
              label={`Step ${stepIndex + 1}`}
              value={step.value}
              error={!!step.errorMessage}
              helperText={step.errorMessage}
              onChange={event => onStepChange(stepIndex, event.target.value)}
              color="secondary"
              rowsMax={3}
              margin="dense"
              multiline
              fullWidth
              InputProps={{
                onFocus: () => onInputFocusHideFab(fabClass.keyboardStyle),
                onBlur: () => onInputBlurShowFab(fabClass.keyboardStyle),
              }}
            />
          )
        })}
        <Button onClick={addStep} color="secondary">Add step</Button>
      </Box>
      <Fab type="submit">Save</Fab>
    </form>
  );
}

export default ExerciseForm;