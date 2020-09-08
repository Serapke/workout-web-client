import * as React from "react";
import {
  Typography,
  Box,
  Avatar,
  makeStyles,
  Theme,
  createStyles,
  ListItem,
} from "@material-ui/core";
import { Add, FitnessCenter } from "@material-ui/icons";
import { Draggable } from "react-beautiful-dnd";
import TaskItemMenu from "./task-item-menu";
import { Task } from "../../store/types";
import CircleItem from "../circle-item";

interface OwnProps {
  index: number;
  task: Task;
  editable?: boolean;
  onSetClick: (taskIndex: number, setIndex: number) => void;
  onAddSetClick: (index: number) => void;
  onDeleteClick: (index: number) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      marginRight: theme.spacing(2),
    },
    listItem: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    setBox: {
      "&>*": {
        margin: "4px",
      },
    },
    bodyTagBox: {
      "&>*": {
        margin: "4px",
      },
    },
  })
);

const TaskItem: React.FC<OwnProps> = ({
  index,
  task,
  editable,
  onSetClick,
  onAddSetClick,
  onDeleteClick,
}) => {
  const classes = useStyles();

  const onSet = (event: React.MouseEvent<HTMLDivElement>, setIndex: number) => {
    event.stopPropagation();
    onSetClick(index, setIndex);
  };

  const onAdd = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    onAddSetClick(index);
  };

  const onDelete = (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    onDeleteClick(index);
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <ListItem
          ref={provided.innerRef}
          className={classes.listItem}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Box display="flex" alignItems="center">
            <Avatar className={classes.avatar}>
              <FitnessCenter />
            </Avatar>
            <div>
              <Typography variant="subtitle2">{task.exercise.title}</Typography>
              <Box display="flex" flexWrap="wrap" className={classes.setBox}>
                {task.sets.map((set, sIndex) => (
                  <CircleItem key={sIndex} color="secondary" outlined onClick={(e) => onSet(e, sIndex)}>
                    {set}
                    {task.exercise.type === "TIMED" ? "s" : "x"}
                  </CircleItem>
                ))}
                {editable && (
                  <CircleItem color="secondary" onClick={onAdd}>
                    <Add />
                  </CircleItem>
                )}
              </Box>
            </div>
          </Box>
          {editable && <TaskItemMenu onDelete={onDelete} />}
        </ListItem>
      )}
    </Draggable>
  );
};

export default TaskItem;
