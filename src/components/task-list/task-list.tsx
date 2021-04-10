import * as React from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { Task, Exercise } from "../../store/types";
import { showModalRequest } from "../../store/modal/thunks";
import { updateTasksRequest } from "../../store/form/thunks";
import EmptyState from "../empty-state";
import { ModalType } from "../modal/modal";
import { ActionType } from "../../store/modal/types";
import { reorder, removeItem } from "../../utils/immutable";
import TaskItem from "../task-item";
import { List } from '@material-ui/core';
import ExerciseDialog from 'components/exercise/exercise-dialog';

interface OwnProps {
  tasks: Task[];
  editable?: boolean;
  showModal?: typeof showModalRequest;
  updateTasks?: typeof updateTasksRequest;
}

const TaskList = ({ tasks, editable, showModal, updateTasks }: OwnProps) => {
  const [open, setOpen] = React.useState(false);
  const [openedExercise, setOpenedExercise] = React.useState<Exercise>(null);

  if (!tasks || !tasks.length) {
    return (
      <div>
        <EmptyState primaryText="No exercises yet." secondaryText="Press + to add it" />
      </div>
    );
  }

  const handleClickOpen = (exercise: Exercise) => {
    console.log("icon click: ", exercise)
    setOpenedExercise(exercise);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenedExercise(null);
  };

  const onSetClick = (taskIndex: number, setIndex: number) => {
    if (!editable) return;
    showModal({
      type: ModalType.SetEditingDialog,
      props: {
        task: tasks[taskIndex],
        action: ActionType.UPDATE,
        index: setIndex,
      },
    });
  };

  const onAddSetClick = (index: number) => {
    showModal({
      type: ModalType.SetEditingDialog,
      props: {
        task: tasks[index],
        action: ActionType.ADD,
      },
    });
  };

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
                  onIconClick={handleClickOpen}
                />
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
      <ExerciseDialog open={open} handleClose={handleClose} exercise={openedExercise} />
    </React.Fragment>
  );
};

export default TaskList;
