import * as React from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { Exercise, Task } from "../../store/types";
import EmptyState from "../empty-state";
import { removeItem, reorder, updateObjectInArray } from "../../utils/immutable";
import TaskItem from "../task-item";
import { List } from '@material-ui/core';
import ExerciseDetailsDialog from 'components/exercise/exercise-details-dialog';
import ExerciseUpdateSetDialog from "../workout/exercise-update-set-dialog";
import ExerciseAddSetDialog from "../workout/exercise-add-set-dialog";

const TaskList = ({ tasks, updateTasks }: OwnProps) => {
  const [exerciseDetailsDialogState, setExerciseDetailsDialogState] = React.useState<ExerciseDetailsDialogState>(EXERCISE_DETAILS_DIALOG_STATE_EMPTY);
  const [exerciseAddSetDialogState, setExerciseAddSetDialogState] = React.useState<ExerciseAddSetDialogState>(EXERCISE_ADD_SET_DIALOG_STATE_EMPTY);
  const [exerciseUpdateSetDialogState, setExerciseUpdateSetDialogState] = React.useState<ExerciseUpdateSetDialogState>(EXERCISE_UPDATE_SET_DIALOG_STATE_EMPTY);

  const editable = !!updateTasks;

  if (!tasks || !tasks.length) {
    return (
      <div>
        <EmptyState primaryText="No exercises yet." secondaryText="Press + to add it"/>
      </div>
    );
  }

  // exercise details dialog
  function handleExerciseIconClick(exercise: Exercise) {
    setExerciseDetailsDialogState({
      open: true,
      exercise
    });
  }

  function handleExerciseDialogClose() {
    setExerciseDetailsDialogState(EXERCISE_DETAILS_DIALOG_STATE_EMPTY);
  }

  // exercise add set dialog
  const onAddSetClick = (taskIndex: number) => {
    if (!editable) return;
    setExerciseAddSetDialogState({
      open: true,
      taskIndex
    });
  };

  function handleExerciseAddSetDialogClose() {
    setExerciseAddSetDialogState(EXERCISE_ADD_SET_DIALOG_STATE_EMPTY);
  }

  function addRepetition(repetitions: number) {
    const task = tasks[exerciseAddSetDialogState.taskIndex];
    updateTasks(updateObjectInArray(tasks, {
      index: exerciseAddSetDialogState.taskIndex,
      item: { ...task, sets: [...task.sets, repetitions] }
    }));
    handleExerciseAddSetDialogClose();
  }

  // exercise update set dialog
  function onSetClick(taskIndex: number, setIndex: number) {
    if (!editable) return;
    setExerciseUpdateSetDialogState({
      open: true,
      taskIndex,
      setIndex
    });
  }

  function handleExerciseUpdateSetDialogClose() {
    setExerciseUpdateSetDialogState(EXERCISE_UPDATE_SET_DIALOG_STATE_EMPTY);
  }

  function updateRepetition(repetitions: number) {
    const task = tasks[exerciseUpdateSetDialogState.taskIndex];
    const sets = tasks[exerciseUpdateSetDialogState.taskIndex].sets;
    updateTasks(updateObjectInArray(tasks, {
      index: exerciseUpdateSetDialogState.taskIndex,
      item: {
        ...task, sets: updateObjectInArray(sets, {
          index: exerciseUpdateSetDialogState.setIndex,
          item: repetitions
        })
      }
    }));
    handleExerciseUpdateSetDialogClose();
  }

  function deleteRepetition() {
    const task = tasks[exerciseUpdateSetDialogState.taskIndex];
    const sets = tasks[exerciseUpdateSetDialogState.taskIndex].sets;
    updateTasks(updateObjectInArray(tasks, {
      index: exerciseUpdateSetDialogState.taskIndex,
      item: { ...task, sets: removeItem(sets, { index: exerciseUpdateSetDialogState.setIndex }) }
    }));
    handleExerciseUpdateSetDialogClose();
  }

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (destination.index === source.index) {
      return;
    }

    const reorderedTasks = reorder(tasks, source.index, destination.index);
    updateTasks(reorderedTasks);
  };

  const onDeleteClick = (index: number) => {
    const updatedTasks = removeItem(tasks, { index });
    updateTasks(updatedTasks);
  };

  return (
    <React.Fragment>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list" isDropDisabled={!editable}>
          {(provided) => (
            <List ref={provided.innerRef} {...provided.droppableProps}>
              {tasks.map((task, index) => (
                <TaskItem
                  index={index}
                  task={task}
                  key={task.id + "_" + index}
                  editable={editable}
                  onSetClick={onSetClick}
                  onAddSetClick={onAddSetClick}
                  onDeleteClick={onDeleteClick}
                  onIconClick={handleExerciseIconClick}
                />
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
      <ExerciseDetailsDialog
        open={exerciseDetailsDialogState.open}
        handleClose={handleExerciseDialogClose}
        exercise={exerciseDetailsDialogState.exercise}
      />
      {editable &&
          <>
              <ExerciseAddSetDialog
                  open={exerciseAddSetDialogState.open}
                  defaultRepetitions={tasks[exerciseAddSetDialogState.taskIndex].exercise.defaultQuantity}
                  onClose={handleExerciseAddSetDialogClose}
                  onAdd={addRepetition}
              />
              <ExerciseUpdateSetDialog
                  open={exerciseUpdateSetDialogState.open}
                  initialRepetitions={tasks[exerciseUpdateSetDialogState.taskIndex].sets[exerciseUpdateSetDialogState.setIndex]}
                  onClose={handleExerciseUpdateSetDialogClose}
                  onUpdate={updateRepetition}
                  onDelete={deleteRepetition}
              />
          </>
      }
    </React.Fragment>
  );
};

interface OwnProps {
  tasks: Task[];
  updateTasks?: (tasks: Task[]) => void;
}

const EXERCISE_ADD_SET_DIALOG_STATE_EMPTY: ExerciseAddSetDialogState = {
  open: false,
  taskIndex: 0
}

interface ExerciseAddSetDialogState {
  open: boolean;
  taskIndex: number;
}

const EXERCISE_DETAILS_DIALOG_STATE_EMPTY: ExerciseDetailsDialogState = {
  open: false,
  exercise: null
}

interface ExerciseDetailsDialogState {
  open: boolean;
  exercise: Exercise;
}

const EXERCISE_UPDATE_SET_DIALOG_STATE_EMPTY: ExerciseUpdateSetDialogState = {
  open: false,
  taskIndex: 0,
  setIndex: 0
}

interface ExerciseUpdateSetDialogState {
  open: boolean;
  taskIndex: number;
  setIndex: number;
}

export default TaskList;
