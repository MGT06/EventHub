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
      return rejectWithValue(err)
    }
  },
);

export const changePasswordThunk = createAsyncThunk(
  "change_password",
  (payload, { getState, rejectWithValue }) => {
    const { dataUser } = getState().dataUserState;
    if (payload.password !== payload.confirm)
      return rejectWithValue({
        typeError: "password",
        message: "Password do not match",
      });

    const { email, ...newPayload } = payload;
    const result = dataUser.map(ele => {
      if (ele.email === email) {
        return {
          ...ele,
          ...newPayload,
        };
      }
      return ele;
    })
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(result)
      }, 2000)
    })
  }
)

const signUpSlices = createSlice({
  name: "dataUser",
  initialState,
  reducers: {
    editUser: (prev, { payload }) => {
      const { email, ...newPayload } = payload;
      return {
        ...prev,
        dataUser: prev.dataUser.map((ele) => {
          if (ele.email === email) {
            return {
              ...ele,
              ...newPayload,
            };
          }
          return ele;
        }),
      };
    },
  },
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
      fulfilled: (state, { payload }) => {
        state.dataUser = payload;
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
