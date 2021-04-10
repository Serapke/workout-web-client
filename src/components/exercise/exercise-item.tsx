import * as React from "react";
import { ListItem, makeStyles, Theme, createStyles, Box, Typography, Chip } from "@material-ui/core";
import { Check, Add, FitnessCenter, Info } from "@material-ui/icons";
import { capitalizeWord } from "../../utils/text-utils";
import { Exercise } from "../../store/types";

interface OwnProps {
  exercise: Exercise;
  selected?: boolean;
  selectable?: boolean;
  onClick?: (id: string) => void;
  onSelect?: (id: string) => void;
  onIconClick?: (exercise: Exercise) => void;
}

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
    bodyParts: {
      "&>*": {
        margin: "4px",
      },
    },
    statusIcon: {
      display: "flex",
      background: "#e5e5e5",
      borderRadius: "50%",
      padding: "7px",
      position: "absolute",
      right: "14px",
      top: "calc((100% - 38px)/2)",
    },
    selected: {
      backgroundColor: theme.palette.primary.main,
    },
  })
);

const ExerciseItem = ({ exercise, selected = false, selectable = true, onClick = () => { }, onSelect, onIconClick }: OwnProps) => {
  const classes = useStyles();

  const handleIconClick = () => {
    if (onIconClick) {
      onIconClick(exercise);
    }
  };

  const handleSelect = () => {
    if (onSelect) {
      onSelect(exercise.id);
    }
  }

  const handleClick = () => {
    if (onClick) {
      onClick(exercise.id);
    }
  }

  return (
    <ListItem button disableGutters onClick={handleClick}>
      <Box className={classes.card}>
        <Box className={classes.cardIcon} onClick={handleIconClick}>
          {onIconClick &&
            <Box position="absolute" right="6px" top="8px">
              <Info className={classes.icon} style={{ fontSize: 14 }} />
            </Box>
          }
          <FitnessCenter className={classes.icon} style={{ fontSize: 50 }} />
        </Box>
        <Box display="flex" flexDirection="column" px={2} py={1}>
          <Typography variant="h6">{exercise.title}</Typography>
          <Box display="flex" mt={0.5} className={classes.bodyParts}>
            {exercise.bodyParts.map((bodyPart) => (
              <Chip key={bodyPart} label={capitalizeWord(bodyPart)} color="secondary" />
            ))}
          </Box>
        </Box>
        {
          selectable && <span onClick={handleSelect} className={`${classes.statusIcon} ${selected ? classes.selected : ""}`}>
            {selected ? <Check color="secondary" /> : <Add color="secondary" />}
          </span>
        }
      </Box>
    </ListItem>
  );
};

export default ExerciseItem;
