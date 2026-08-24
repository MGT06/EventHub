import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataEvent: [],
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  error: null,
};

export const getEventThunk = createAsyncThunk(
  "get_event",
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
      const { dataEvent } = getState().eventState;
      if (dataEvent.length > 0) return false;
    },
    dispatchConditionRejection: false,
  },
);

export const joinEventThunk = createAsyncThunk(
  "join_event",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const { dataEvent } = getState().eventState;
      const newData = dataEvent.map((ele) => {
        if (ele.id === payload.id) {
          return {
            ...ele,
            attendees: [...ele.attendees, payload.email],
          };
        }
        return ele;
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
export const unjoinEventThunk = createAsyncThunk(
  "unjoin_event",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const { dataEvent } = getState().eventState;
      const newData = dataEvent.map((ele) => {
        if (ele.id !== payload.id) return ele;

        return {
          ...ele,
          attendees: ele.attendees.filter((join) => join !== payload.email),
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

export const savedEventThunk = createAsyncThunk(
  "saved_event",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const { dataEvent } = getState().eventState;
      const newData = dataEvent.map((ele) => {
        if (ele.id !== payload.id) return ele;
        if (ele.userSaved.includes(payload.email)) {
          return {
            ...ele,
            userSaved: ele.userSaved.filter((saved) => saved !== payload.email),
          };
        }

        if (ele.id === payload.id) {
          return {
            ...ele,
            userSaved: [...ele.userSaved, payload.email],
          };
        }
        return ele;
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

const eventSlices = createSlice({
  name: "joinedEvent",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    return builder
      .addAsyncThunk(getEventThunk, {
        pending: (state) => {
          state.isPending = true;
          state.isFulfilled = false;
          state.isRejected = false;
          state.error = null;
        },
        fulfilled: (state, { payload }) => {
          state.dataEvent = payload;
          state.isPending = false;
          state.isFulfilled = true;
        },
        rejected: (state, { payload }) => {
          state.isPending = false;
          state.isRejected = true;
          state.error = payload;
        },
      })
      .addAsyncThunk(joinEventThunk, {
        pending: (state) => {
          state.isPending = true;
          state.isFulfilled = false;
          state.isRejected = false;
          state.error = null;
        },
        fulfilled: (state, { payload }) => {
          state.dataEvent = payload;
          state.isPending = false;
          state.isFulfilled = true;
        },
        rejected: (state, { payload }) => {
          state.isPending = false;
          state.isRejected = true;
          state.error = payload;
        },
      })
      .addAsyncThunk(unjoinEventThunk, {
        pending: (state) => {
          state.isPending = true;
          state.isFulfilled = false;
          state.isRejected = false;
          state.error = null;
        },
        fulfilled: (state, { payload }) => {
          state.dataEvent = payload;
          state.isPending = false;
          state.isFulfilled = true;
        },
        rejected: (state, { payload }) => {
          state.isPending = false;
          state.isRejected = true;
          state.error = payload;
        },
      })
      .addAsyncThunk(savedEventThunk, {
        pending: (state) => {
          state.isPending = true;
          state.isFulfilled = false;
          state.isRejected = false;
          state.error = null;
        },
        fulfilled: (state, { payload }) => {
          state.dataEvent = payload;
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

export default eventSlices.reducer;
