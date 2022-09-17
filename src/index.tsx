import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';
import * as serviceWorker from './serviceWorker';
import "styleguide/global.css";
import theme from "./styleguide/theme";
import { ThemeProvider } from '@material-ui/core';
import { BrowserRouter } from "react-router-dom";


ReactDOM.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
