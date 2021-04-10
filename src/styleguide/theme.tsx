import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";
import { amber, grey } from "@material-ui/core/colors";

let theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[900],
    },
    secondary: {
      main: amber[500],
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
