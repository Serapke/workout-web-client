import useRequest, { RequestState } from "./useRequest";
import { fetchExercises } from "../services/exercise";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import useIsMounted from "./useIsMounted";
import { Exercise } from "../store/types";
import { uniqueArray } from "../utils/array-utils";
import { capitalizeWord } from "../utils/text-utils";
import { FilterSelectOption } from "../components/select/filter-select";

export function useHandleExercisesDataRequest(): ExercisesRequestState {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [titleFilter, setTitleFilter] = React.useState<string>("");
  const [titleOptions, setTitleOptions] = useState<string[]>([]);
  const [bodyPartsFilter, setBodyPartsFilter] = React.useState<string[]>([]);
  const [bodyPartOptions, setBodyPartOptions] = useState<FilterSelectOption[]>([]);
  const [typeOptions, setTypeOptions] = useState<FilterSelectOption[]>([]);
  const [typeFilter, setTypeFilter] = React.useState<string[]>([]);
  const [visibleExercises, setVisibleExercises] = React.useState<Exercise[]>([]);
  const isMounted = useIsMounted();

  const { beginRequest, requestState } = useRequest(
    () => fetchExercises()
  );

  function filter(exercises: Exercise[], title: string, bodyPartsFilter: string[], typesFilter: string[]) {
    console.log(bodyPartsFilter);
    const filteredExercises = exercises
      .filter(exercise => exercise.title.toLowerCase().includes(title))
      .filter(exercise => !bodyPartsFilter.length || exercise.bodyParts.some(bodyPart => bodyPartsFilter.includes(bodyPart)))
      .filter(exercise => !typesFilter.length || typesFilter.some(type => exercise.type.toLowerCase() === type.toLowerCase()));
    setVisibleExercises(filteredExercises);
  }

  function onTitleFilterChange(title: string) {
    setTitleFilter(title);
    filter(exercises, title, bodyPartsFilter, typeFilter);
  }

  function onBodyPartsFilterChange(bodyParts: string[]) {
    setBodyPartsFilter(bodyParts);
    filter(exercises, titleFilter, bodyParts, typeFilter);
  }

  function onTypeFilterChange(types: string[]) {
    setTypeFilter(types);
    filter(exercises, titleFilter, bodyPartsFilter, types);
  }

  const refresh = useCallback(() => {
    beginRequest()
      .then((data) => {
        if (isMounted()) {
          setExercises(data.exercises);
          setTitleOptions(data.exercises.map(exercise => exercise.title));
          setBodyPartOptions(
            uniqueArray(data.exercises.flatMap(exercise => exercise.bodyParts))
              .map(bodyPart => ({ key: bodyPart, value: capitalizeWord(bodyPart)}))
          );
          setTypeOptions(
            uniqueArray(data.exercises.map(exercise => exercise.type))
              .map(type => ({ key: type, value: capitalizeWord(type)}))
          );
          filter(data.exercises, titleFilter, bodyPartsFilter, typeFilter)
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }, [beginRequest, isMounted]);

  useEffect(() => {
    refresh();
  }, []);

  return {
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
    exercises: visibleExercises,
  }
}

export interface ExercisesRequestState {
  requestState: RequestState;
  titleOptions: string[];
  titleFilter: string;
  onTitleFilterChange: (title: string) => void;
  bodyPartOptions: FilterSelectOption[];
  bodyPartsFilter: string[];
  onBodyPartsFilterChange: (bodyParts: string[]) => void;
  typeOptions: FilterSelectOption[];
  typeFilter: string[];
  onTypeFilterChange: (types: string[]) => void;
  exercises: Exercise[];
}