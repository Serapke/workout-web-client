import * as React from "react";
import { connect } from "react-redux";
import {
  Input,
  makeStyles,
  createStyles,
  Theme,
  Chip,
  Button,
  FormControl,
  InputLabel,
  IconButton,
  List,
} from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BodyPart, Exercise } from "../../../store/types";
import { fetchBodyPartsRequest, fetchExercisesRequest } from "../../../store/content/thunks";
import { addExercisesToWorkoutRequest } from "../../../store/form/thunks";
import { fabKeyboardStyles, onInputFocusHideFab, onInputBlurShowFab } from "../../../utils/ui-utils";
import { removeItem } from "../../../utils/immutable";
import { capitalizeWord } from "../../../utils/text-utils";
import ExerciseItem from "../../../components/exercise";
import EmptyState from "../../../components/empty-state";
import { ApplicationState } from "../../../store";
import ExerciseDialog from 'components/exercise/exercise-dialog';

interface PropsFromState {
  bodyParts: BodyPart[];
  exercises: Exercise[];
}

interface PropsFromDispatch {
  fetchBodyParts: typeof fetchBodyPartsRequest;
  fetchExercises: typeof fetchExercisesRequest;
  saveWorkoutTasks: typeof addExercisesToWorkoutRequest;
}

type AllProps = PropsFromState & PropsFromDispatch;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      display: "flex",
      justifyContent: "space-between",
    },
    chips: {
      marginTop: "5px",
    },
    fab: {
      position: "fixed",
      bottom: theme.spacing(2),
      left: "50%",
      transform: "translateX(-50%)",
      width: "200px",
    },
    label: {
      margin: theme.spacing(1),
    },
    list: {
      maxHeight: "350px",
      overflow: "scroll",
    },
    button: {
      marginTop: theme.spacing(2),
      width: "100%",
    },
  })
);

const ExerciseSelectPage = ({
                              bodyParts,
                              exercises,
                              fetchBodyParts,
                              fetchExercises,
                              saveWorkoutTasks,
                            }: AllProps) => {
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
  const [selectedBodyParts, setSelectedBodyParts] = React.useState<BodyPart[]>([]);
  const [open, setOpen] = React.useState(false);
  const [openedExercise, setOpenedExercise] = React.useState<Exercise>(null);
  const classes = useStyles();
  const fabClass = fabKeyboardStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as { from: Location };
  const from = state ? state.from.pathname : '/';

  React.useEffect(() => {
    fetchBodyParts();
    fetchExercises();
  }, [fetchBodyParts, fetchExercises]);

  const handleClickOpen = (exercise: Exercise) => {
    setOpenedExercise(exercise);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenedExercise(null);
  };

  const onExerciseClick = (id: string) => {
    if (isSelected(id)) {
      setSelectedItems((prevState) => removeItem(prevState, { index: selectedItems.indexOf(id) }));
    } else {
      setSelectedItems((prevState) => [...prevState, id]);
    }
  };

  const isSelected = (id: string) => {
    return selectedItems.includes(id);
  };

  const onBodyPartClicked = (bodyPart: BodyPart) => () => {
    if (isSelectedBodyPart(bodyPart)) {
      setSelectedBodyParts((prevState) => removeItem(prevState, { index: selectedBodyParts.indexOf(bodyPart) }));
    } else {
      setSelectedBodyParts((prevState) => [...prevState, bodyPart]);
    }
  };

  const isSelectedBodyPart = (bodyPart: BodyPart) => {
    return selectedBodyParts.includes(bodyPart);
  };

  const filteredExercises = exercises.filter((exercise) => {
    const bodyPartFilter = selectedBodyParts.every((bodyPart) => exercise.bodyParts.includes(bodyPart));
    const searchQueryFilter = !searchQuery.length || exercise.title.toLowerCase().includes(searchQuery.toLowerCase());
    return bodyPartFilter && searchQueryFilter;
  });

  const onSelect = () => {
    saveWorkoutTasks(selectedItems);
    navigate(from, { state: { new: false } });
  };

  return (
    <div>
      <div className={classes.header}>
        <h2>Exercises</h2>
        <Button color="secondary" component={Link} to="/exercise/create">
          + NEW EXERCISE
        </Button>
      </div>
      <FormControl fullWidth>
        <InputLabel htmlFor="exercise" className={classes.label} color="secondary">
          Search
        </InputLabel>
        <Input
          id="exercise"
          value={searchQuery}
          color="secondary"
          onChange={(e) => setSearchQuery(e.target.value)}
          endAdornment={
            <IconButton onClick={() => setSearchQuery("")}>
              <Clear style={{ color: "black" }}/>
            </IconButton>
          }
          onFocus={() => onInputFocusHideFab(fabClass.keyboardStyle)}
          onBlur={() => onInputBlurShowFab(fabClass.keyboardStyle)}
        />
      </FormControl>
      <div className={classes.chips}>
        {bodyParts.map((bodyPart) => (
          <Chip
            color={isSelectedBodyPart(bodyPart) ? "secondary" : "default"}
            key={bodyPart}
            size="medium"
            label={capitalizeWord(bodyPart)}
            onClick={onBodyPartClicked(bodyPart)}
            style={{ margin: "3px" }}
            clickable
          />
        ))}
      </div>
      <List className={classes.list}>
        {filteredExercises.length ? (
          filteredExercises.map((exercise, index) => (
            <ExerciseItem
              key={exercise.id + "_" + index}
              exercise={exercise}
              selected={isSelected(exercise.id)}
              onSelect={onExerciseClick}
              onIconClick={handleClickOpen}
            />
          ))
        ) : (
          <EmptyState primaryText="No exercises matched your search."/>
        )}
      </List>
      <Button id="fab" className={classes.fab} color="secondary" variant="contained" onClick={onSelect}>
        Select
      </Button>
      <ExerciseDialog open={open} handleClose={handleClose} exercise={openedExercise}/>
    </div>
  );
};

const mapStateToProps = ({ content }: ApplicationState) => ({
  bodyParts: content.bodyParts,
  exercises: content.exercises,
});

const mapDispatchToProps = {
  fetchBodyParts: fetchBodyPartsRequest,
  fetchExercises: fetchExercisesRequest,
  saveWorkoutTasks: addExercisesToWorkoutRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseSelectPage);
