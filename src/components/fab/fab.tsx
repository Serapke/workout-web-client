import React from 'react';
import { Button, makeStyles } from '@material-ui/core';

interface OwnProps {
  children: string | React.ReactNode;
  type: "submit" | "button";
}

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    left: "50%",
    transform: "translateX(-50%)",
    width: "200px",
  },
}));

const Fab = ({ children, type = "button" }: OwnProps) => {
  const classes = useStyles();
  return (
    <Button id="fab" className={classes.fab} color="secondary" variant="contained" type={type}>
      {children}
    </Button>
  )
}

export default Fab;