import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedUser: null,
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  error: null,
};

const organizer = {
  name: import.meta.env.VITE_ORGANIZER_NAME,
  email: import.meta.env.VITE_ORGANIZER_EMAIL,
  password: import.meta.env.VITE_ORGANIZER_PASSWORD,
  access: import.meta.env.VITE_ORGANIZER_ACCESS,
};

const admin = {
  name: import.meta.env.VITE_ADMIN_NAME,
  email: import.meta.env.VITE_ADMIN_EMAIL,
  password: import.meta.env.VITE_ADMIN_PASSWORD,
  access: import.meta.env.VITE_ADMIN_ACCESS,
};

export const loginThunk = createAsyncThunk(
  "login",
  (payload, { getState, rejectWithValue }) => {
    const { dataUser } = getState().dataUserState;
    if (
      payload.email === organizer.email &&
      payload.password === organizer.password
    ) {
      const result = new Promise((resolve) => {
        setTimeout(() => {
          resolve(organizer)
        }, 2000)
      })
      return result
    }

    if (payload.email === admin.email && payload.password === admin.password) {
      const result = new Promise((resolve) => {
        setTimeout(() => {
          resolve(admin)
        }, 2000)
      })
      return result
    }

    for (const dataLocal of dataUser) {
      if (
        dataLocal.email === payload.email &&
        dataLocal.password === payload.password
      ) {
        const result = new Promise((resolve) => {
          setTimeout(() => {
            resolve(dataUser.find((data) => data.email === payload.email))
          }, 2000)
        })
        return result
      }
    }

    return rejectWithValue("email or password are incorrect");
  },
);

const signInSlices = createSlice({
  name: "loggedUser",
  initialState,
  reducers: {
    logout: (prev) => {
      return {
        ...prev,
        loggedUser: "",
      };
    },
  },
  extraReducers: (builder) => {
    return builder.addAsyncThunk(loginThunk, {
      pending: (state) => {
        state.isPending = true;
        state.isFulfilled = false;
        state.isRejected = false;
        state.error = null;
      },
      fulfilled: (state, { payload }) => {
        state.loggedUser = payload;
        state.isPending = false;
        state.isFulfilled = true;
      },
      rejected: (state, { payload }) => {
        state.isPending = false;
        state.isRejected = true;
        state.error = payload;
      },
    })
  }
});

export const { logout } = signInSlices.actions;

export default signInSlices.reducer;
