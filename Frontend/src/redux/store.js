import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authSlice from "./slicers/authSlice.js";
import jobSlice from "./slicers/jobSlice.js";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const customStorage = {
  getItem: (key) => {
    return Promise.resolve(localStorage.getItem(key));
  },
  setItem: (key, item) => {
    localStorage.setItem(key, item);
    return Promise.resolve(item);
  },
  removeItem: (key) => {
    localStorage.removeItem(key);
    return Promise.resolve();
  },
};

const persistConfig = { key: 'root', version: 1, storage : customStorage};

const rootReducer = combineReducers({auth : authSlice, job : jobSlice});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }),
})

export default store;