import * as React from "react";
import { TextField, Chip, FormControl, FormGroup, makeStyles, Button, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import { connect } from "react-redux";

import { RouteComponentProps } from "react-router-dom";
import { fetchBodyPartsRequest } from "../../../store/content/thunks";
import { Exercise } from "../../../store/types";
import { ApplicationState } from "../../../store";
import { fabKeyboardStyles, onInputFocusHideFab, onInputBlurShowFab } from "../../../utils/ui-utils";
import { capitalizeWord } from "../../../utils/text-utils";
import { createExercise } from "../../../services/exercise";

interface RouteParams {
  id: string;
}

interface PropsFromState {
  bodyParts: string[];
}

interface PropsFromDispatch {
  fetchBodyParts: typeof fetchBodyPartsRequest;
}

type OwnProps = PropsFromState & PropsFromDispatch & RouteComponentProps<RouteParams>;

interface FieldState {
  value: any;
  errorMessage: string;
}

interface FormState {
  title: FieldState;
  description: FieldState;
  defaultReps: FieldState;
  type: FieldState;
  bodyParts: FieldState;
}

const useStyles = makeStyles((theme) => ({
  selectLabel: {
    marginBottom: theme.spacing(2),
  },
  chip: {
    marginLeft: theme.spacing(1),
  },
  formControl: {
    marginTop: theme.spacing(3),
  },
  unitSelection: {
    display: "flex",
    alignItems: "baseline",
  },
  chipGroup: {
    flexWrap: "nowrap",
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    left: "50%",
    transform: "translateX(-50%)",
    width: "200px",
  },
}));

const types = ["Repetitions", "Seconds"];

const formToExercise = (form: FormState): Exercise => ({
  id: null,
  title: form.title.value,
  description: form.description.value,
  bodyParts: form.bodyParts.value,
  defaultQuantity: form.defaultReps.value,
  measurementType: form.type.value === "Repetitions" ? "QUANTITATIVE" : "TIMED",
});

const ExerciseCreatePage = ({ bodyParts, match, history, fetchBodyParts }: OwnProps) => {
  const bodyPartsInputRef = React.createRef<HTMLInputElement>();
  const classes = useStyles();
  const fabClass = fabKeyboardStyles();

  const [form, setForm] = React.useState<FormState>({
    title: { value: "", errorMessage: "" },
    description: { value: "", errorMessage: "" },
    defaultReps: { value: "", errorMessage: "" },
    type: { value: types[0], errorMessage: "" },
    bodyParts: { value: [], errorMessage: "" },
  });

  React.useEffect(() => {
    fetchBodyParts();
  }, [fetchBodyParts, match.params.id]);

  const changeFormField = (field: keyof FormState, value: { value?: any; errorMessage: string }) => {
    setForm((prevState) => ({ ...prevState, [field]: { ...prevState[field], ...value } }));
  };

  const onTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeFormField(event.target.id as keyof FormState, { value: event.target.value, errorMessage: "" });
  };

  const onTypeChange = (value: string) => () => {
    changeFormField("type", { value, errorMessage: "" });
  };

  const onBodyPartsChange = (_event: any, newValue: string[]) => {
    changeFormField("bodyParts", { value: newValue, errorMessage: "" });
  };

  const setFieldError = (field: keyof FormState, errorMessage: string) => {
    changeFormField(field, { errorMessage });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    validate();
    const exercise = formToExercise(form);
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
    <div>
      <form onSubmit={handleSubmit}>
        <Typography variant="h4">Create exercise</Typography>
        <FormControl className={classes.formControl} fullWidth>
          <TextField
            id="title"
            name="new-exercise-title"
            label="Title"
            color="secondary"
            value={form.title.value}
            error={!!form.title.errorMessage}
            helperText={form.title.errorMessage}
            InputProps={{
              onFocus: () => onInputFocusHideFab(fabClass.keyboardStyle),
              onBlur: () => onInputBlurShowFab(fabClass.keyboardStyle),
            }}
            onChange={onTextFieldChange}
            required
          />
        </FormControl>
        <FormControl className={classes.formControl} fullWidth>
          <TextField
            id="description"
            name="description"
            label="Description"
            color="secondary"
            value={form.description.value}
            rowsMax={5}
            error={!!form.description.errorMessage}
            helperText={form.description.errorMessage}
            InputProps={{
              onFocus: () => onInputFocusHideFab(fabClass.keyboardStyle),
              onBlur: () => onInputBlurShowFab(fabClass.keyboardStyle),
            }}
            onChange={onTextFieldChange}
            multiline
          />
        </FormControl>
        <div className={`${classes.formControl} ${classes.unitSelection}`}>
          <TextField
            id="defaultReps"
            name="defaultReps"
            label="Quantity"
            type="number"
            value={form.defaultReps.value}
            error={!!form.defaultReps.errorMessage}
            helperText={form.defaultReps.errorMessage}
            InputProps={{
              onFocus: () => onInputFocusHideFab(fabClass.keyboardStyle),
              onBlur: () => onInputBlurShowFab(fabClass.keyboardStyle),
            }}
            onChange={onTextFieldChange}
            required
          />
          <FormGroup className={classes.chipGroup} row>
            {types.map((type) => (
              <Chip
                key={type}
                className={classes.chip}
                label={type}
                color={form.type.value === type ? "secondary" : "default"}
                onClick={onTypeChange(type)}
              />
            ))}
          </FormGroup>
        </div>
        <FormControl className={classes.formControl} fullWidth>
          <Autocomplete
            options={bodyParts}
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
        </FormControl>
        <Button id="fab" className={classes.fab} color="secondary" variant="contained" type="submit">
          Save
        </Button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ content }: ApplicationState) => ({
  bodyParts: content.bodyParts,
});

const mapDispatchToProps = {
  fetchBodyParts: fetchBodyPartsRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseCreatePage);
