import * as React from "react";
import { SwipeableDrawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, SvgIconTypeMap } from "@material-ui/core";
import { Home, Favorite, History, FitnessCenter } from "@material-ui/icons";
import { Link, LinkProps } from "react-router-dom";
import { OverridableComponent } from '@material-ui/core/OverridableComponent';

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

interface LinkData {
  name: string;
  url: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
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
            <ListItem key={link.name} component={AdapterLink} to={link.url}>
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
