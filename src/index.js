import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'tw-elements-react/dist/css/tw-elements-react.min.css';
import { UserProvider } from './UserContext';
import ErrorBoundary from './components/ErrorBoundary';




ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css" />
      </head>
      <UserProvider>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </UserProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();