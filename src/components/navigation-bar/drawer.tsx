import * as React from "react";
import { SwipeableDrawer, List, ListItem, ListItemIcon, ListItemText, makeStyles } from "@material-ui/core";
import { Home, Favorite } from "@material-ui/icons";
import { Link, LinkProps } from "react-router-dom";

interface OwnProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const AdapterLink = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <Link innerRef={ref as any} {...props} />
));

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  listItemText: {
    color: "black",
  },
});

const Drawer = ({ open, onOpen, onClose }: OwnProps) => {
  const classes = useStyles();
  return (
    <SwipeableDrawer open={open} onOpen={onOpen} onClose={onClose}>
      <div className={classes.list} role="presentation" onClick={onClose}>
        <List>
          <ListItem key="Home" component={AdapterLink} to="/">
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText className={classes.listItemText} primary="Home" />
          </ListItem>
          <ListItem key="Favorites" component={AdapterLink} to="/favorites">
            <ListItemIcon>
              <Favorite />
            </ListItemIcon>
            <ListItemText className={classes.listItemText} primary="Favorites" />
          </ListItem>
        </List>
      </div>
    </SwipeableDrawer>
  );
};

export default Drawer;
