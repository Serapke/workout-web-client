import React from "react";
import Dialog from 'components/dialogs/dialog';
import { Exercise } from "../../store/types";
import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";
import { removeItem } from "../../utils/immutable";
import ExerciseList, { ExerciseListItem } from "../../pages/exercise/exercises-page/components/exercise-list";
import Autocomplete from "../autocomplete";
import { RequestState } from "../../hooks/useRequest";
import FilterSelect from "../select/filter-select";
import { useHandleExercisesDataRequest } from "../../hooks/use-handle-exercises-data-request";

const ExerciseSelectDialog = ({ open, handleClose, onSelect }: OwnProps) => {
  const classes = useStyles();
  const [selectedIds, setSelectedIds] = React.useState<number[]>([]);

  const {
    requestState,
    titleOptions,
    titleFilter,
    onTitleFilterChange,
    bodyPartOptions,
    bodyPartsFilter,
    onBodyPartsFilterChange,
    typeOptions,
    typeFilter,
    onTypeFilterChange,
    exercises
  } = useHandleExercisesDataRequest();

  function isSelected(id: number) {
    return selectedIds.includes(id);
  }

  function onExerciseClick(id: number) {
    if (isSelected(id)) {
      setSelectedIds((prevState) => removeItem(prevState, { index: selectedIds.indexOf(id) }));
    } else {
      setSelectedIds((prevState) => [...prevState, id]);
    }
  }

  function onDialogClose() {
    setSelectedIds([]);
    handleClose();
  }

  const button = {
    text: "Select",
    onClick: () => {
      const selectedExercises = exercises.filter(exercise => selectedIds.includes(exercise.id));
      onSelect(selectedExercises);
    }
  };

  const exerciseListItems = (exercises as ExerciseListItem[]).map(exercise => {
    exercise.selected = isSelected(exercise.id);
    return exercise;
  });

  return (
    <Dialog open={open} title="Select exercises" handleClose={onDialogClose} fullScreen button={button}>
      <Box padding={2}>
        <Box className={classes.filterBox}>
          <Box flexBasis="100%">
            <Autocomplete
              label="Search"
              value={titleFilter}
              options={titleOptions}
              onChange={onTitleFilterChange}
              loading={requestState === RequestState.FETCHING}
            />
          </Box>
          <Box flex={1}>
            <FilterSelect
              label="Body parts"
              value={bodyPartsFilter}
              options={bodyPartOptions}
              onChange={onBodyPartsFilterChange}
              loading={requestState === RequestState.FETCHING}
            />
          </Box>
          <Box flex={1}>
            <FilterSelect
              label="Type"
              value={typeFilter}
              options={typeOptions}
              onChange={onTypeFilterChange}
              loading={requestState === RequestState.FETCHING}
            />
          </Box>
        </Box>
        <Box paddingY={1}>
          { requestState === RequestState.FETCHING
            ? <Box>Loading...</Box>
            : <ExerciseList exercises={exerciseListItems} onExerciseClick={onExerciseClick} selectable={true}/>
          }
        </Box>
      </Box>
    </Dialog>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    filterBox: {
      display: "flex",
      gap: theme.spacing(1),
      flexWrap: "wrap",
      [theme.breakpoints.up('sm')]: {
        flexWrap: 'nowrap',
      },
    },
  }),
);

interface OwnProps {
  open: boolean;
  handleClose: () => void;
  onSelect: (selectedExercises: Exercise[]) => void;
}

export default ExerciseSelectDialog;