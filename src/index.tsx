import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from '@mui/styles';
import { ModalProvider } from 'react-declarative';

import AlertProvider from './components/AlertProvider';

import THEME_LIGHT from './theme';

import App from './App';

const wrappedApp = (
  <ThemeProvider theme={THEME_LIGHT}>
    <ModalProvider>
      <AlertProvider>
        <App />
      </AlertProvider>
    </ModalProvider>
  </ThemeProvider>
);

ReactDOM.render(wrappedApp, document.getElementById('root'));
