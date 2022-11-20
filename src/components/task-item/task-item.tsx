import * as React from "react";
import { Box, createStyles, ListItem, makeStyles, Theme, Typography, } from "@material-ui/core";
import { FitnessCenter, Info } from "@material-ui/icons";
import { Draggable } from "react-beautiful-dnd";
import TaskItemMenu from "./task-item-menu";
import { Exercise, Task } from "../../store/types";
import CircleItem from "../circle-item";
import { exerciseMeasurementTypeToLetter } from 'utils/common';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      width: "100%",
      display: "flex",
      border: "1px solid #909090",
      borderRadius: theme.spacing(1),
      overflow: "hidden",
      position: "relative",
    },
    cardIcon: {
      width: "75px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.palette.primary.main,
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      position: "relative",
    },
    icon: {
      color: theme.palette.primary.contrastText,
    },
    setBox: {
      "&>*": {
        margin: "4px",
      },
    },
  })
);

const TaskItem = ({
                    index,
                    task,
                    editable,
                    onSetClick,
                    onAddSetClick,
                    onDeleteClick,
                    onChangeWeightClick,
                    onIconClick
                  }: OwnProps) => {
  const classes = useStyles();

  function onSet(event: React.MouseEvent<HTMLDivElement>, setIndex: number) {
    event.stopPropagation();
    onSetClick(index, setIndex);
  }

  function onAdd(event: React.MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
    onAddSetClick(index);
  }

  function onDelete(event: React.MouseEvent<HTMLLIElement>) {
    event.stopPropagation();
    onDeleteClick(index);
  }

  function onChangeWeight(event: React.MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
    onChangeWeightClick(index);
  }

  return (
    <Draggable draggableId={task.draggableId} index={index} isDragDisabled={!editable}>
      {(provided) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          disableGutters
        >
          <Box className={classes.card}>
            <Box className={classes.cardIcon} onClick={() => onIconClick(task.exercise)}>
              <Box position="absolute" right="6px" top="8px">
                <Info className={classes.icon} style={{ fontSize: 14 }}/>
              </Box>
              {
                task.exercise.imageUrl
                  ? <img src={task.exercise.imageUrl} alt={task.exercise.title} width={70}/>
                  : <FitnessCenter className={classes.icon} style={{ fontSize: 50 }}/>
              }
            </Box>
            <Box display="flex" flexDirection="column" px={2} py={1}>
              <Typography variant="h6">{task.exercise.title}</Typography>
              <Box display="flex" mt={0.5} className={classes.setBox}>
                {task.sets.map((set, sIndex) =>
                  <CircleItem key={`set-goal-${sIndex}`} size="small" color="secondary"
                              onClick={(e) => onSet(e, sIndex)}>
                    {set}
                    {exerciseMeasurementTypeToLetter(task.exercise.measurementType)}
                  </CircleItem>
                )}
                {editable && (
                  <CircleItem key={`set-goal-plus`} size="small" color="secondary" onClick={onAdd} fontSize="20px">
                    +
                  </CircleItem>
                )}
                {task.exercise.weighted && (
                  <CircleItem key={`weight`} size="small" color="primary"
                              onClick={onChangeWeight}>{task.weight}</CircleItem>
                )}
              </Box>
            </Box>
            {editable &&
                <Box position="absolute" right="5px"><TaskItemMenu onDelete={onDelete}/></Box>
            }
          </Box>
        </ListItem>
      )}
    </Draggable>
  );
};

interface OwnProps {
  index: number;
  task: Task;
  editable?: boolean;
  onSetClick: (taskIndex: number, setIndex: number) => void;
  onAddSetClick: (index: number) => void;
  onDeleteClick: (index: number) => void;
  onChangeWeightClick: (index: number) => void;
  onIconClick: (exercise: Exercise) => void;
}

export default TaskItem;
