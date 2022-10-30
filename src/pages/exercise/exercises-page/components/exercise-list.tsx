import { List } from '@material-ui/core';
import { Exercise } from 'store/types';
import React from 'react';
import ExerciseItem from 'components/exercise';

const ExerciseList = ({ exercises, selectable = false, onExerciseClick }: OwnProps) => {
  return (
    <List disablePadding>
      {exercises && exercises.map((exercise, index) => (
        <ExerciseItem
          key={exercise.id + "_" + index}
          exercise={exercise}
          selectable={selectable}
          selected={exercise.selected}
          onClick={onExerciseClick}
        />
      ))}
    </List>
  );
}

interface OwnProps {
  exercises: ExerciseListItem[];
  onExerciseClick: (id: number) => void;
  selectable?: boolean;
}

export interface ExerciseListItem extends Exercise {
  selected?: boolean
}

export default ExerciseList;