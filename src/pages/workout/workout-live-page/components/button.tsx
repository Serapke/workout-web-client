import { makeStyles, Theme, createStyles, Button as MButton } from '@material-ui/core';
import React from 'react';

interface OwnProps {
  disabled: boolean;
  onClick: () => void;
  children: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      position: "fixed",
      bottom: theme.spacing(2),
      left: "50%",
      transform: "translateX(-50%)",
      width: "200px",
      fontSize: "20px"
    },
  })
)

const Button = ({ disabled, onClick, children }: OwnProps) => {
  const classes = useStyles();

  return (
    <MButton size="large" id="fab" className={classes.button} color="secondary" variant="contained" type="button" onClick={() => onClick()} disabled={disabled}>
      {children}
    </MButton>
  );
}

export default Button;