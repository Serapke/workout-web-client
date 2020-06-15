import * as React from "react";
import {
  Chip,
  Typography,
  ExpansionPanelDetails,
  withStyles,
  Box,
  Avatar,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import { Add, FitnessCenter } from "@material-ui/icons";
import { Draggable } from "react-beautiful-dnd";
import { capitalizeWord } from "../../utils/text-utils";
import TaskItemMenu from "./task-item-menu";
import { Task } from "../../store/types";
import CircleItem from "../circle-item";

interface OwnProps {
  index: number;
  task: Task;
  expanded: boolean;
  editable?: boolean;
  onChange: (event: React.ChangeEvent<{}>, isExpanded: boolean) => void;
  onSetClick: (taskIndex: number, setIndex: number) => void;
  onAddSetClick: (index: number) => void;
  onDeleteClick: (index: number) => void;
}

const ExpansionPanel = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    flexDirection: "column",
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      marginRight: theme.spacing(2),
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
  expanded,
  editable,
  onChange,
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
        <ExpansionPanel
          expanded={expanded}
          onChange={onChange}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ExpansionPanelSummary>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center">
                <Avatar className={classes.avatar}>
                  <FitnessCenter />
                </Avatar>
                <div>
                  <Typography component="div">{task.exercise.title}</Typography>
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
            </Box>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Box>
              <Typography variant="body1" gutterBottom>
                {task.exercise.description}
              </Typography>
              <Box className={classes.bodyTagBox}>
                {task.exercise.bodyParts.map((bodyPart) => (
                  <Chip key={bodyPart} size="small" label={capitalizeWord(bodyPart)} />
                ))}
              </Box>
            </Box>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )}
    </Draggable>
  );
};

export default TaskItem;
