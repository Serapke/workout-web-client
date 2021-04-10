import React from 'react'
import { Dialog as MuiDialog, AppBar, Toolbar, IconButton, Typography, makeStyles, Theme, createStyles } from '@material-ui/core'
import { Close } from '@material-ui/icons'

interface OwnProps {
  title?: string;
  open: boolean;
  fullScreen: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }),
);

const Dialog = ({ title, open, handleClose, fullScreen, children }: OwnProps) => {
  const classes = useStyles();

  return (
    <MuiDialog open={open} fullScreen={fullScreen} onClose={handleClose}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <Close />
          </IconButton>
          {title && <Typography variant="h6">
            {title}
          </Typography>}
        </Toolbar>
      </AppBar>
      {children}
    </MuiDialog>
  )
}

export default Dialog;