import * as React from "react";
import { Task } from 'store/types';
import { List, ListItemAvatar, Avatar, ListItem, ListItemText, Box, Divider, makeStyles, Theme, createStyles } from '@material-ui/core';
import { FitnessCenter } from '@material-ui/icons';
import CircleItem from 'components/circle-item';
import { exerciseMeasurementTypeToLetter } from 'utils/common';

interface OwnProps {
  tasks: Task[];
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

const TaskList = ({ tasks }: OwnProps) => {
  const classes = useStyles();

  return (
    <List>
      {tasks && <Divider component="li" />}
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
                    {task.sets.map((set, sIndex) => (
                      <CircleItem key={sIndex} color="secondary">
                        {set}{exerciseMeasurementTypeToLetter(task.exercise.measurementType)}
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
    </List >
  )
}

export default TaskList;