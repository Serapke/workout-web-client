import React from 'react';
import { TextField, Box, FormGroup, Chip, makeStyles } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import Fab from 'components/fab';
import { BodyPart, Exercise, MeasurementType } from 'store/types';
import { capitalizeWord } from 'utils/text-utils';
import { fabKeyboardStyles, onInputFocusHideFab, onInputBlurShowFab } from 'utils/ui-utils';

export interface FieldState {
  value: any;
  errorMessage: string;
}

export interface FormState {
  title: FieldState;
  description: FieldState;
  defaultQuantity: FieldState;
  measurementType: FieldState;
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

const types = [
  { title: "Repetitions", value: MeasurementType.QUANTITATIVE },
  { title: "Seconds", value: MeasurementType.TIMED }
];

export const EMPTY_FORM: FormState = {
  title: { value: "", errorMessage: "" },
  description: { value: "", errorMessage: "" },
  defaultQuantity: { value: "", errorMessage: "" },
  measurementType: { value: types[0].value, errorMessage: "" },
  bodyParts: { value: [], errorMessage: "" },
};

const formToExercise = (form: FormState): Exercise => ({
  id: null,
  title: form.title.value,
  description: form.description.value,
  bodyParts: form.bodyParts.value,
  defaultQuantity: form.defaultQuantity.value,
  measurementType: form.measurementType.value,
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

  const onMeasurementTypeChange = (value: string) => () => {
    changeFormField("measurementType", { value, errorMessage: "" });
  };

  const onBodyPartsChange = (_event: any, newValue: string[]) => {
    changeFormField("bodyParts", { value: newValue, errorMessage: "" });
  };

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
          margin="normal"
          fullWidth
          InputProps={{
            onFocus: () => onInputFocusHideFab(fabClass.keyboardStyle),
            onBlur: () => onInputBlurShowFab(fabClass.keyboardStyle),
          }}
        />
      </Box>
      <Box marginTop={2}>
        <TextField
          id="description"
          label="Description"
          value={form.description.value}
          error={!!form.description.errorMessage}
          helperText={form.description.errorMessage}
          onChange={onTextFieldChange}
          color="secondary"
          margin="normal"
          rowsMax={5}
          multiline
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
          margin="normal"
          fullWidth
          InputProps={{
            onFocus: () => onInputFocusHideFab(fabClass.keyboardStyle),
            onBlur: () => onInputBlurShowFab(fabClass.keyboardStyle),
          }}
        />
        <FormGroup className={classes.measurementTypeGroup} row>
          {types.map((type) => (
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
      <Fab type="submit">Save</Fab>
    </form>
  );
}

export default ExerciseForm;