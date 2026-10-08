import { configureStore } from "@reduxjs/toolkit";
import dataUserReducer from "./slices/dataUserSlices.js";
import loggedUserReducer from "./slices/loggedUserSlices.js";
import eventReducer from "./slices/eventSlices.js";
import communityReducer from "./slices/communitySlices.js";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

const storage = {
  getItem: (key) => {
    return Promise.resolve(window.localStorage.getItem(key));
  },
  setItem: (key, value) => {
    return Promise.resolve(window.localStorage.setItem(key, value));
  },
  removeItem: (key) => {
    return Promise.resolve(window.localStorage.removeItem(key));
  },
};

const persistSignUpConfig = {
  key: "dataUser",
  storage,
  blacklist: ['error']
};
const persistSignInConfig = {
  key: "loggedUser",
  storage,
  whitelist: ['token']
};
const persistEventConfig = {
  key: "event",
  storage,
};
const persistCommunityConfig = {
  key: "joinCommunity",
  storage,
};

const store = configureStore({
  reducer: {
    dataUserState: persistReducer(persistSignUpConfig, dataUserReducer),
    loggedUserState: persistReducer(persistSignInConfig, loggedUserReducer),
    eventState: persistReducer(persistEventConfig, eventReducer),
    communityState: persistReducer(persistCommunityConfig, communityReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
