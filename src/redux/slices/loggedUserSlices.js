import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api/interceptor";

const initialState = {
  loggedUser: null,
  token: "",
  role: "",
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  error: null,
};

export const signInThunk = createAsyncThunk(
  "sign_in",
  async (payload, { rejectWithValue }) => {
    try {
      const data = JSON.stringify({
        email: payload.email,
        password: payload.password
      })
      const response = await axios.post("http://localhost:9000/auth/login", data)
      return response.data.Data
    } catch (err) {
      return rejectWithValue(err.response.data.Message);
    }
  },
);

export const getInfoUserThunk = createAsyncThunk(
  "get_info",
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().loggedUserState
    try {
      const response = await api.get("/user/headerinfo", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data.Data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const getProfileUser = createAsyncThunk(
  "get_profile",
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().loggedUserState
    try {
      const response = await api.get("/user", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data.Data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const signOutThunk = createAsyncThunk(
  "sign_out",
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().loggedUserState
    try {
      const response = await api.post("/auth/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data.Message
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

const signInSlices = createSlice({
  name: "loggedUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    return builder.addAsyncThunk(signInThunk, {
      pending: (state) => {
        state.isPending = true;
        state.isFulfilled = false;
        state.isRejected = false;
        state.error = null;
      },
      fulfilled: (state, { payload }) => {
        state.token = payload.token;
        state.isPending = false;
        state.isFulfilled = true;
      },
      rejected: (state, { payload }) => {
        state.isPending = false;
        state.isRejected = true;
        state.error = payload;
      },
    }),
      builder.addAsyncThunk(getInfoUserThunk, {
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
      }),
      builder.addAsyncThunk(signOutThunk, {
        pending: (state) => {
          state.isPending = true;
          state.isFulfilled = false;
          state.isRejected = false;
          state.error = null;
        },
        fulfilled: (state) => {
          state.loggedUser = ""
          state.token = ""
          state.isPending = false;
          state.isFulfilled = true;
        },
        rejected: (state, { payload }) => {
          state.isPending = false;
          state.isRejected = true;
          state.error = payload;
        },
      }),
      builder.addAsyncThunk(getProfileUser, {
        pending: (state) => {
          state.isPending = true;
          state.isFulfilled = false;
          state.isRejected = false;
          state.error = null;
        },
        fulfilled: (state, { payload }) => {
          state.loggedUser = { ...state.loggedUser, ...payload};
          state.role = payload.role
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

export const { signOutAction } = signInSlices.actions;

export default signInSlices.reducer;
