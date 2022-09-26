import React from "react";
import Dialog from 'components/dialogs/dialog';
import { Exercise } from "../../store/types";
import { createStyles, List, makeStyles, Theme } from "@material-ui/core";
import ExerciseItem from "./exercise-item";
import { getExercises } from "../../services/exercise";
import { removeItem } from "../../utils/immutable";

interface OwnProps {
  open: boolean;
  handleClose: () => void;
  onSelect: (selectedExercises: Exercise[]) => void;
}

const ExerciseSelectDialog = ({ open, handleClose, onSelect }: OwnProps) => {

  const [selectedIds, setSelectedIds] = React.useState<number[]>([]);
  const [exercises, setExercises] = React.useState<Exercise[]>([]);

  const classes = useStyles();

  React.useEffect(() => {
    if (open) {
      getExercises().then((exercises) => setExercises(exercises));
    }
  }, [open]);

  const button = {
    text: "Select",
    onClick: () => {
      const selectedExercises = exercises.filter(exercise => selectedIds.includes(exercise.id));
      onSelect(selectedExercises);
    }
  };

  const isSelected = (id: number) => {
    return selectedIds.includes(id);
  };

  const onExerciseClick = (id: number) => {
    if (isSelected(id)) {
      setSelectedIds((prevState) => removeItem(prevState, { index: selectedIds.indexOf(id) }));
    } else {
      setSelectedIds((prevState) => [...prevState, id]);
    }
  };
  
  return (
    <Dialog open={open} title="Select exercises" handleClose={handleClose} fullScreen button={button}>
      {/* TODO: FE-0004 - implement*/}
      {/*<Box>*/}
      {/*  <FilterSelect options={uniqueArray(exercises.flatMap(exercise => exercise.bodyParts))}/>*/}
      {/*  <FilterSelect options={uniqueArray(exercises.map(exercise => exercise.type))}/>*/}
      {/*</Box>*/}
      <List classes={{root: classes.list}}>
        {exercises.map((exercise) => (
          <ExerciseItem
            key={exercise.id}
            exercise={exercise}
            selected={isSelected(exercise.id)}
            onSelect={onExerciseClick}/>
        ))}
      </List>
    </Dialog>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      padding: theme.spacing(0, 1),
    },
  }),
);

export default ExerciseSelectDialog;