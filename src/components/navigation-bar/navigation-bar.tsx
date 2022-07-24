import * as React from "react";

import { AppBar, Toolbar, IconButton, makeStyles, Typography, Link } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import Drawer from "./drawer";
import { useAuth } from "../../hooks/useAuth";

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
  const auth = useAuth();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={() => setDrawerOpen(true)}
        >
          <Menu/>
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Sportuok
        </Typography>
        {
          auth.user ? (
            <Link color="inherit" onClick={auth.signOut}>Logout</Link>
          ) : (
            <Link color="inherit" href={"/login"}>Login</Link>
          )
        }
      </Toolbar>
      <Drawer open={drawerOpen} onOpen={() => setDrawerOpen(true)} onClose={() => setDrawerOpen(false)}/>
    </AppBar>
  );
};

export default NavigationBar;
