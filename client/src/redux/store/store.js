// client\src\redux\store\store.js


import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer from '../reducers/userReducer';
import { thunk } from 'redux-thunk';  // Import thunk if you need it
import logger from 'redux-logger';  // Import logger if you need it

const rootReducer = combineReducers({
    user: userReducer,
    // Add other reducers for different features here
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk, logger),
    // Optionally, you can provide devTools, etc.
});

export default store;