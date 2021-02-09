import * as React from "react";
import { getWorkoutHistories as getWorkoutHistory } from 'services/workout-history';
import { WorkoutHistory } from 'services/types';
import { Box, Typography, Card, CardContent, Avatar, makeStyles, Theme, createStyles, Chip } from '@material-ui/core';
import { Timeline, TimelineItem, TimelineOppositeContent, TimelineSeparator, TimelineConnector, TimelineContent } from '@material-ui/lab';
import { FitnessCenter, Watch } from '@material-ui/icons';
import { formatTime } from 'utils/time';
import { RouteComponentProps } from 'react-router-dom';

type AllProps = RouteComponentProps & {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    timeline: {
      padding: 0,
    },
    timelineOppositeContent: {
      flex: "0 1 57px",
      textAlign: "center"
    },
    timelineSeparator: {
      flex: "0 1 auto"
    },
    timelineContent: {
      flex: 1
    },
    cardContent: {
      padding: 16,
      '&:last-child': {
        paddingBottom: 16
      }
    },
    day: {
      fontWeight: "bold"
    },
    month: {
      color: "#bdbdbd",
      fontSize: "0.8rem"
    },
    duration: {
      marginLeft: 4
    }
  })
)

const HistoryPage: React.FunctionComponent<AllProps> = ({ history }) => {
  const classes = useStyles();
  const [workoutHistory, updateWorkoutHistory] = React.useState<WorkoutHistory[]>([]);

  React.useEffect(() => {
    getWorkoutHistory().then((h) => updateWorkoutHistory(h));
  }, [workoutHistory.length]);

  if (!workoutHistory) return <div></div>;

  const onCardClick = (id: number, workoutId: number) => {
    history.push(`/workout/${workoutId}/result/${id}`);
  }

  return (
    <Box>
      <Typography variant="h4">History page</Typography>
      <Timeline classes={{ root: classes.timeline }}>
        {
          workoutHistory.map(item => {
            const date = item.endTime.split(" ");
            return (
              <TimelineItem key={item.id}>
                <TimelineOppositeContent classes={{ root: classes.timelineOppositeContent }}>
                  <Typography classes={{ root: classes.day }}>{date[0]}</Typography>
                  <Typography classes={{ root: classes.month }}>{date[1].toUpperCase()}</Typography>
                </TimelineOppositeContent>
                <TimelineSeparator classes={{ root: classes.timelineSeparator }}>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent classes={{ root: classes.timelineContent }}>
                  <Card onClick={() => onCardClick(item.id, item.workoutId)}>
                    <CardContent classes={{ root: classes.cardContent }}>
                      <Box display="flex" alignItems="center">
                        <Avatar>
                          <FitnessCenter />
                        </Avatar>
                        <Box display="flex" flexDirection="column" pl={2} width="100%">
                          <Box mb={1}>
                            <Typography variant="subtitle2">{item.title}</Typography>
                          </Box>
                          <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Box display="flex">
                              <Watch fontSize="small" style={{ color: "#bdbdbd" }} />
                              <Typography classes={{ root: classes.duration }} variant="subtitle2">{formatTime(item.duration)}</Typography>
                            </Box>
                            {item.emotion &&
                              <Box>
                                <Chip size="small" color="secondary" label={`#${item.emotion.toString().toLowerCase()}`} />
                              </Box>
                            }
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </TimelineContent>
              </TimelineItem>
            )
          })
        }
      </Timeline>
    </Box>
  )
}

export default HistoryPage;