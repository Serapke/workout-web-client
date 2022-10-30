import * as React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import ExerciseList from './components/exercise-list';
import { AddCircleOutline } from '@material-ui/icons';
import FilterSelect from "../../../components/select/filter-select";
import Autocomplete from "../../../components/autocomplete";
import { useHandleExercisesDataRequest } from "../../../hooks/use-handle-exercises-data-request";
import { RequestState } from "../../../hooks/useRequest";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      marginBottom: theme.spacing(2),
    },
    filterBox: {
      display: "flex",
      gap: theme.spacing(1),
      flexWrap: "wrap",
      [theme.breakpoints.up('sm')]: {
        flexWrap: 'nowrap',
      },
    }
  })
);

const ExercisesPage: React.FunctionComponent = () => {
  const classes = useStyles();
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
  const navigate = useNavigate();

  function onExerciseClick(id: number) {
    navigate(`/exercise/${id}`);
  }

  return (
    <Box>
      <Box className={classes.header} display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4">Exercises</Typography>
        <Button color="secondary" component={Link} to={`/exercise/create`} startIcon={<AddCircleOutline/>}>
          ADD
        </Button>
      </Box>
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
          : <ExerciseList exercises={exercises} onExerciseClick={onExerciseClick}/>
        }
      </Box>
    </Box>
  )
}

export default ExercisesPage;