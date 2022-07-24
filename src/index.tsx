import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';
import * as serviceWorker from './serviceWorker';
import "styleguide/global.css";
import theme from "./styleguide/theme";
import { Provider } from "react-redux";
import { ApplicationState } from "./store";
import { emptyWorkoutFormState } from "./store/form/utils";
import { configureStore } from "./configure-store";
import { ThemeProvider } from '@material-ui/core';
import { BrowserRouter } from "react-router-dom";

const initialState: ApplicationState = {
  content: { routines: [], workouts: [], exercises: [], bodyParts: [] },
  activeItem: { routine: null, workout: null },
  form: { workout: emptyWorkoutFormState },
  modal: { type: null, props: null, result: null },
};

const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </React.StrictMode>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
