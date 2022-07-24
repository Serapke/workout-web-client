import * as React from "react";
import { Box, Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Frontdoor = () => {
  const auth = useAuth();

  return (
    <Box padding={2}>
      <Typography variant="h2">Welcome to Sportuok{auth.user && `, ${auth.user.firstName}`}</Typography>
      <Box>
        <Button variant="contained" color="secondary" component={Link} to="/favorites">
          Favorites
        </Button>
      </Box>
    </Box>
  );
};

export default Frontdoor;
