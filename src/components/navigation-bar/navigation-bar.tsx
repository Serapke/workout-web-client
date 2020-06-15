import * as React from "react";

import { AppBar, Toolbar, IconButton, makeStyles, Typography, Button } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import Drawer from "./drawer";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const NavigationBar = () => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <AppBar position="static" color="secondary">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={() => setDrawerOpen(true)}
        >
          <Menu />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Sportuok
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
      <Drawer open={drawerOpen} onOpen={() => setDrawerOpen(true)} onClose={() => setDrawerOpen(false)} />
    </AppBar>
  );
};

export default NavigationBar;
