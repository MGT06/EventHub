import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  dataUser: [],
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  error: null,
};

export const signUpThunk = createAsyncThunk(
  "sign_up",
  async (payload, { rejectWithValue }) => {
    if (payload.password !== payload.confirm)
      return rejectWithValue({
        typeError: "password",
        message: "Password do not match",
      });
    try {
      const response = await axios.post("http://localhost:9000/auth/register", {
        fullname: payload.name,
        email: payload.email,
        password: payload.password
      })
      console.log(response)
      return response
    } catch (err) {
      return rejectWithValue(err.response)
    }
  },
);

export const changePasswordThunk = createAsyncThunk(
  "change_password",
  async (payload, { getState, rejectWithValue }) => {
    const { token } = getState().loggedUserState
    try {
      const data = JSON.stringify({
        currentPassword: payload.currPassword,
        newPassword: payload.password
      })
      const response = await axios.post("http://localhost:9000/user/change-password", data, {
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

export const editProfileThunk = createAsyncThunk(
  "edit_profile",
  async (payload, { getState, rejectWithValue }) => {
    const { token } = getState().loggedUserState
    try {
      const data = {
        name : payload.name,
        bio : payload.bio,
        user_location: payload.location,
        position: payload.position,
        avatar_url: payload.avatar
      }
      const response = await axios.patch("http://localhost:9000/user/edit", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      })
      return response.data.Message
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

const signUpSlices = createSlice({
  name: "dataUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    return builder.addAsyncThunk(signUpThunk, {
      pending: (state) => {
        state.isPending = true;
        state.isFulfilled = false;
        state.isRejected = false;
        state.error = null;
      },
      fulfilled: (state, { payload }) => {
        state.dataUser.push(payload.data);
        state.isPending = false;
        state.isFulfilled = true;
      },
      rejected: (state, { payload }) => {
        state.isPending = false;
        state.isRejected = true;
        state.error = payload;
      },
    }).addAsyncThunk(changePasswordThunk, {
      pending: (state) => {
        state.isPending = true;
        state.isFulfilled = false;
        state.isRejected = false;
        state.error = null;
      },
      fulfilled: (state) => {
        state.isPending = false;
        state.isFulfilled = true;
      },
      rejected: (state, { payload }) => {
        state.isPending = false;
        state.isRejected = true;
        state.error = payload;
      },
    });
  },
});

export const { editUser } = signUpSlices.actions;

export default signUpSlices.reducer;
