import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataCommunity: [],
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  error: null,
};

export const getCommunityThunk = createAsyncThunk(
  "get_community",
  async (payload, { rejectWithValue }) => {
    try {
      const event = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(payload);
        }, 2000);
      });
      return event;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
  {
    condition: (_, { getState }) => {
      const { dataCommunity } = getState().communityState;
      if (dataCommunity.length > 0) return false;
    }
  },
);

export const joinCommunityThunk = createAsyncThunk(
  "join_community",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const { dataCommunity } = getState().communityState;

      const newData = dataCommunity.map((ele) => {
        if (ele.id !== payload.id) return ele;

        if (ele.members.includes(payload.email)) {
          return {
            ...ele,
            members: ele.members.filter((join) => join !== payload.email),
          };
        }
        return {
          ...ele,
          members: [...ele.members, payload.email],
        };
      });
      const result = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(newData);
        }, 1000);
      });
      return result;
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
      });
  },
});

export default communitySlices.reducer;
