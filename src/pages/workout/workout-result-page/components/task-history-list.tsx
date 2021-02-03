import React from 'react';
import { makeStyles, Theme, createStyles, List, ListItem, ListItemAvatar, Avatar, ListItemText, Box, Divider } from '@material-ui/core';
import { FitnessCenter } from '@material-ui/icons';
import CircleItem from 'components/circle-item';
import { TaskHistory } from 'services/types';

interface OwnProps {
  tasks: TaskHistory[];
}

const useStyles = makeStyles((theme: Theme) =>
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

const TaskHistoryList = ({ tasks }: OwnProps) => {
  const classes = useStyles();

  return (
    <List className={classes.list}>
      {
        tasks && tasks.map((task, tIndex) => {
          return (
            <React.Fragment key={tIndex}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <FitnessCenter />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText disableTypography primary={task.exercise.title} secondary={
                  <Box display="flex" mt={0.5} className={classes.setBox}>
                    {task.setsDone.map((set, sIndex) => (
                      <CircleItem key={sIndex} color="secondary">
                        {set}{task.exercise.type === "TIMED" ? "s" : "x"}
                      </CircleItem>
                    ))}
                  </Box>
                } />
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          )
        })
      }
    </List>
  )
}

export default TaskHistoryList;
