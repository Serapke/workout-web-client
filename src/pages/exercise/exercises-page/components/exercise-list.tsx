import { List } from '@material-ui/core';
import { Exercise } from 'store/types';
import React from 'react';
import ExerciseItem from 'components/exercise';

interface OwnProps {
  exercises: Exercise[];
  onExerciseClick: (id: string) => void;
}

const ExerciseList = ({ exercises, onExerciseClick }: OwnProps) => {
  return (
    <List>
      {exercises && exercises.map((exercise, index) => (
        <ExerciseItem
          key={exercise.id + "_" + index}
          exercise={exercise}
          selectable={false}
          onClick={onExerciseClick}
        />
      ))}
    </List>
  );
}

export default ExerciseList;