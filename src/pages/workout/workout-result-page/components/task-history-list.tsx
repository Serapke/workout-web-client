import React from 'react';
import {
  Avatar,
  Box,
  createStyles,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  makeStyles
} from '@material-ui/core';
import { FitnessCenter } from '@material-ui/icons';
import CircleItem from 'components/circle-item';
import { TaskHistory } from 'services/types';

const TaskHistoryList = ({ tasks }: OwnProps) => {
  const classes = useStyles();

  if (!tasks) {
    return;
  }

  return (
    <List className={classes.list}>
      {
        tasks.map((tasksPerCycle, cycle) => (
          <List className={classes.list} key={cycle} subheader={ tasks.length > 1 && (
            <CycleHeader cycle={cycle+1} key={cycle} />
          )}>
            {
              tasksPerCycle.map((task, tIndex) => (
                  <React.Fragment key={tIndex}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <FitnessCenter/>
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText disableTypography primary={task.exercise.title} secondary={
                        <Box display="flex" mt={0.5} className={classes.setBox}>
                          {task.setsDone && task.setsDone.map((set, sIndex) => (
                            <CircleItem key={sIndex} color="secondary">
                              {set}{task.exercise.measurementType === "TIMED" ? "s" : "x"}
                            </CircleItem>
                          ))}
                        </Box>
                      }/>
                    </ListItem>
                    <Divider component="li"/>
                  </React.Fragment>
              ))
            }
          </List>
        ))
      }
    </List>
  )
}

const CycleHeader = ({ cycle }: { cycle: number}) => {
  return (
    <ListSubheader disableSticky>
      Cycle {cycle}
    </ListSubheader>
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    list: {
      width: '100%',
    },
    setBox: {
      "&>*": {
        margin: "0 4px",
      }
    },
  })
)

interface OwnProps {
  tasks: TaskHistory[][];
}

export default TaskHistoryList;
