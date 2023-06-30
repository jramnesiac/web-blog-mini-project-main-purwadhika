import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ('preline')
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from 'react-redux';
import { store } from './redux/store';


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <ThemeProvider>
      <App />
  </ThemeProvider>
  </Provider>
);
