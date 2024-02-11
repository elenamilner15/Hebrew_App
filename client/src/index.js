import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom"

import { Provider } from 'react-redux';
import store from './redux/store/store.js';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { setUserData, updateToken } from './redux/actions/userActions';

//_____________
// Check if there is user data in localStorage
const storedUser = localStorage.getItem('user');
const storedToken = localStorage.getItem('token');

if (storedUser && storedToken) {
  const userData = JSON.parse(storedUser);

  // Dispatch actions to update user data and token
  store.dispatch(setUserData(userData));
  store.dispatch(updateToken(storedToken));
}
//_____________

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <DndProvider backend={HTML5Backend}>
          <App />
        </DndProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode >
);


reportWebVitals();
