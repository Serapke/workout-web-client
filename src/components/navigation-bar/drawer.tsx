import * as React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  SvgIconTypeMap,
  SwipeableDrawer
} from "@material-ui/core";
import { Favorite, FitnessCenter, History, Home } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { OverridableComponent } from '@material-ui/core/OverridableComponent';

interface OwnProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  listItemText: {
    color: "black",
  },
});

interface LinkData {
  name: string;
  url: string;
  icon: OverridableComponent<SvgIconTypeMap>;
}

const links: LinkData[] = [
  {
    "name": "Home",
    "url": "/",
    "icon": Home,
  },
  {
    "name": "Favorites",
    "url": "/favorites",
    "icon": Favorite,
  },
  {
    "name": "History",
    "url": "/history",
    "icon": History,
  },
  {
    "name": "Exercises",
    "url": "/exercises",
    "icon": FitnessCenter,
  }
];

const Drawer = ({ open, onOpen, onClose }: OwnProps) => {
  const classes = useStyles();
  return (
    <SwipeableDrawer open={open} onOpen={onOpen} onClose={onClose}>
      <div className={classes.list} role="presentation" onClick={onClose}>
        <List>
          {links.map(link => (
            <ListItem key={link.name} component={Link} to={link.url}>
              <ListItemIcon>
                <link.icon />
              </ListItemIcon>
              <ListItemText className={classes.listItemText} primary={link.name} />
            </ListItem>
          ))}
        </List>
      </div>
    </SwipeableDrawer>
  );
};

export default Drawer;
