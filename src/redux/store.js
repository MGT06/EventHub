import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

import signUpReducer from "./slices/signUpSlices.js"
import signInReducer from "./slices/signInSlices.js"
import eventReducer from "./slices/eventSlices.js"
import communityReducer from "./slices/communitySlices.js"


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
    storage
}
const persistSignInConfig = {
    key: "loggedUser",
    storage
}
const persistEventConfig = {
    key: "joinEvent",
    storage
}
const persistCommunityConfig = {
    key: "joinCommunity",
    storage
}

const store = configureStore({
    reducer: {
        dataUserState: persistReducer(persistSignUpConfig, signUpReducer),
        loggedUserState: persistReducer(persistSignInConfig, signInReducer),
        eventState: persistReducer(persistEventConfig ,eventReducer),
        communityState: persistReducer(persistCommunityConfig, communityReducer)
    }
})

export const persistor = persistStore(store)

export default store