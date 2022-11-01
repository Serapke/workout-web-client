import React from 'react'
import {
  AppBar,
  Button,
  createStyles,
  Dialog as MuiDialog,
  IconButton,
  makeStyles,
  Theme,
  Toolbar,
  Typography
} from '@material-ui/core'
import { Close } from "@material-ui/icons";

const Dialog = ({ title, open, handleClose, fullScreen = false, children, button, fixedToBottom = false }: OwnProps) => {
  const classes = useStyles();

  return (
    <MuiDialog open={open} fullScreen={fullScreen} onClose={handleClose} classes={fixedToBottom ? { paper: classes.dialog } : {}}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <Close />
          </IconButton>
          {title && <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>}
          {button && <Button autoFocus color="inherit" onClick={button.onClick}>{button.text}</Button>}
        </Toolbar>
      </AppBar>
      {children}
    </MuiDialog>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    dialog: {
      position: 'absolute',
      bottom: 0,
      width: "100%",
      marginBottom: 0
    }
  }),
);

interface ButtonProps {
  text: string
  onClick: () => void;
}

interface OwnProps {
  title: string;
  open: boolean;
  children: React.ReactNode;
  handleClose: () => void;
  fixedToBottom?: boolean;
  fullScreen?: boolean;
  button?: ButtonProps;
}

export default Dialog;