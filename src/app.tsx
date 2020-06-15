import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";

import { configureStore } from "./configure-store";
import routes from "./routes";
import theme from "styleguide/theme";
import { ApplicationState } from "./store";
import { emptyWorkoutFormState } from "./store/form/utils";
import { ThemeProvider } from "@material-ui/core";

const initialState: ApplicationState = {
  content: { routines: [], workouts: [], exercises: [], bodyParts: [] },
  activeItem: { routine: null, workout: null },
  form: { workout: emptyWorkoutFormState },
  modal: { type: null, props: null, result: null },
};

const store = configureStore(initialState);

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
