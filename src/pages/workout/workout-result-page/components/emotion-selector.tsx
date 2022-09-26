import React from 'react';
import { Emotion } from 'services/types';
import { Box, Button, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';

interface OwnProps {
  emotion: Emotion;
  onEmotionClick: (Emotion) => void;
  editable: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    emotionTitle: {
      marginBottom: 12
    },
    buttonRoot: {
      '&$buttonDisabled': {
        backgroundColor: `${theme.palette.secondary.main}!important`,
        color: 'black',
        boxShadow: 'none'
      }
    },
    buttonDisabled: {}
  })
)

const EmotionSelector = ({ emotion, onEmotionClick, editable }: OwnProps) => {
  const classes = useStyles();
  const [emotionState, updateEmotion] = React.useState<string>(emotion ? emotion.toString() : null);

  const onEmotionSelect = (em: string) => {
    updateEmotion(em);
    onEmotionClick(em);
  }

  if (!editable && !emotion) {
    return null;
  }

  const title = editable ? "How are you feeling?" : "It made you feel...";

  function isButtonDisabled(buttonEmotion: string) {
    console.log(!editable, buttonEmotion, emotionState);
    return !editable || buttonEmotion === emotionState;
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%" py={3}>
      <Typography variant="h5" className={classes.emotionTitle}>{title}</Typography>
      <Box display="flex" justifyContent="space-around" width="100%">
        {
          Object.keys(Emotion)
            .filter(key => !isNaN(Number(Emotion[key])))
            .map(em => (
              <Button
                key={em}
                classes={{ root: classes.buttonRoot, disabled: em === emotionState ? classes.buttonDisabled : '' }}
                variant={em === emotionState ? 'contained' : 'outlined'}
                color="secondary"
                onClick={() => onEmotionSelect(em)}
                disabled={isButtonDisabled(em)}
              >
                {em}
              </Button>
            ))
        }
      </Box>
    </Box>
  );
}

export default EmotionSelector;