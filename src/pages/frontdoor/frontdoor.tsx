import * as React from "react";
import { makeStyles, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
}));

const Frontdoor = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div>Workout link</div>
      <div>Plans carousel</div>
      <Button variant="contained" color="secondary" component={Link} to="/favorites" fullWidth>
        Favorites
      </Button>
    </div>
  );
};

export default Frontdoor;
