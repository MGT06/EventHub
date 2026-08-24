import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataUser: [],
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  error: null,
};

export const registerThunk = createAsyncThunk(
  "register",
  (payload, { getState, rejectWithValue }) => {
    const { dataUser } = getState().dataUserState;
    for (const dataLocal of dataUser) {
      if (dataLocal.email === payload.email)
        return rejectWithValue({
          typeError: "email",
          message: "Email is exist",
        });
    }
    if (payload.password !== payload.confirm)
      return rejectWithValue({
        typeError: "password",
        message: "Password do not match",
      });

    return { ...payload, access: "attendee" };
  },
);

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
    return builder.addAsyncThunk(registerThunk, {
      pending: (state) => {
        state.isPending = true;
        state.isFulfilled = false;
        state.isRejected = false;
        state.error = null;
      },
      fulfilled: (state, { payload }) => {
        state.dataUser.push(payload);
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
