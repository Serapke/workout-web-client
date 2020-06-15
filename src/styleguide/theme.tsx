import { createMuiTheme } from "@material-ui/core";
import green from "@material-ui/core/colors/green";
import { amber } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: amber[500],
    },
  },
});

export default theme;
