import React from 'react';
import { Box, Chip, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import { Exercise } from 'store/types';
import Dialog from 'components/dialogs/dialog';

interface OwnProps {
  open: boolean;
  handleClose: () => void;
  exercise: Exercise;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chip: {
      marginLeft: theme.spacing(0.5),
    },
  })
)

const ExerciseDetailsDialog = ({ open, exercise, handleClose }: OwnProps) => {
  const classes = useStyles();

  if (!exercise) {
    return null;
  }

  return (
    <Dialog open={open} title="Exercise details" handleClose={handleClose} fullScreen>
      {exercise && <Box p={3}>
        {exercise.imageUrl &&
            <Box>
                <img src={exercise.imageUrl} alt={exercise.title} width={200}/>
            </Box>
        }
        <Box mb={2}>
          <Typography variant="h4">{exercise.title}</Typography>
        </Box>
        <Box mb={1}>
          <Typography variant="subtitle2">Description</Typography>
          <Typography variant="body1">{exercise.description.startingPosition}</Typography>
          <Box pl={2} pt={1}>
            {exercise.description.steps.map((step, stepIndex) => <Typography key={stepIndex} variant="body1">{stepIndex + 1}. {step}</Typography>)}
          </Box>
        </Box>
        <Box mb={1}>
          <Typography variant="subtitle2">Muscle group</Typography>
          {exercise.bodyParts.map(bodyPart => (<Chip key={bodyPart} label={bodyPart} color="secondary" className={classes.chip} />))}
        </Box>
        <Box>
          <Typography variant="subtitle2">Equipment</Typography>
          {exercise.equipment.map(eq => (<Chip key={eq} label={eq} color="secondary" className={classes.chip} />))}
        </Box>
      </Box>}
    </Dialog>
  )
}

export default ExerciseDetailsDialog;