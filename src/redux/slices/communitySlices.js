import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api/interceptor";

const initialState = {
  dataCommunity: [],
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  error: null,
};

export const getCommunityThunk = createAsyncThunk(
  "get_community",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:9000/community")
      return response.data.Data
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const joinCommunityThunk = createAsyncThunk(
  "join_community",
  async (payload, { getState, rejectWithValue }) => {
    const { token } = getState().loggedUserState
    try {
      const response = await api.post(`http://localhost:9000/community/join/${payload}`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data.status
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

const communitySlices = createSlice({
  name: "joinedCommunity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    return builder
      .addAsyncThunk(getCommunityThunk, {
        pending: (state) => {
          state.isPending = true;
          state.isFulfilled = false;
          state.isRejected = false;
          state.error = null;
        },
        fulfilled: (state, { payload }) => {
          state.dataCommunity = payload;
          state.isPending = false;
          state.isFulfilled = true;
        },
        rejected: (state, { payload }) => {
          state.isPending = false;
          state.isRejected = true;
          state.error = payload;
        },
      })
      .addAsyncThunk(joinCommunityThunk, {
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

export default communitySlices.reducer;
