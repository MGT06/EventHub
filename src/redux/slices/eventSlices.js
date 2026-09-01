import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataEvent: [],
  createEvent: {
    step: 1,
    basic: {
      coverImage: "",
      title: "",
      description: "",
      category: [],
      community: "",
    },
    dateLocation: {
      eventDate: "",
      startTime: "",
      endTime: "",
      format: "",
      location: "",
      capacity: "",
    },
    organizer: null,
    speakers: [],
    attendees: [],
  },
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
  },
);

export const createEventThunk = createAsyncThunk(
  "create_event",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const { dataEvent } = getState().eventState;
      const result = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: dataEvent[dataEvent.length - 1].id + 1,
            ...payload
          });
        }, 1000);
      });
      return result;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const editEventThunk = createAsyncThunk(
  "edit_event",
  async (payload, { rejectWithValue }) => {
    try {
      const result = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            ...payload
          });
        }, 1000);
      });
      console.log(result)
      return result;
    } catch (e) {
      return rejectWithValue(e);
    }
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

        return {
          ...ele,
          userSaved: [...ele.userSaved, payload.email],
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

const eventSlices = createSlice({
  name: "joinedEvent",
  initialState,
  reducers: {
    nextStep: (prev) => {
      if (prev.createEvent.step < 3) {
        return {
          ...prev,
          createEvent: {
            ...prev.createEvent,
            step: prev.createEvent.step + 1,
          },
        };
      }
      return prev;
    },
    prevStep: (prev) => {
      if (prev.createEvent.step > 1) {
        return {
          ...prev,
          createEvent: {
            ...prev.createEvent,
            step: prev.createEvent.step - 1,
          },
        };
      }
      return prev;
    },
    setBasic: (prev, { payload }) => {
      return {
        ...prev,
        createEvent: {
          ...prev.createEvent,
          basic: {
            ...prev.createEvent.basic,
            ...payload,
          },
        },
      };
    },
    setDateLocation: (prev, { payload }) => {
      return {
        ...prev,
        createEvent: {
          ...prev.createEvent,
          dateLocation: {
            ...prev.createEvent.dateLocation,
            ...payload,
          },
        },
      };
    },
    setSpeakers: (prev, { payload }) => {
      return {
        ...prev,
        createEvent: {
          ...prev.createEvent,
          speakers: Array.isArray(payload) ? payload : [...prev.createEvent.speakers, payload],
        },
      };
    },
    removeSpeakers: (prev, { payload }) => {
      return {
        ...prev,
        createEvent: {
          ...prev.createEvent,
          speakers: prev.createEvent.speakers.filter(
            (ele) => ele.name !== payload,
          ),
        },
      };
    },
    setCategory: (prev, { payload }) => {
      return {
        ...prev,
        createEvent: {
          ...prev.createEvent,
          basic: {
            ...prev.createEvent.basic,
            category: [...prev.createEvent.basic.category, payload],
          },
        },
      };
    },
    removeCategory: (prev, { payload }) => {
      return {
        ...prev,
        createEvent: {
          ...prev.createEvent,
          basic: {
            ...prev.createEvent.basic,
            category: prev.createEvent.basic.category.filter(
              (ele) => ele !== payload,
            ),
          },
        },
      };
    },
    resetState: (prev) => {
      return {
        ...prev,
        createEvent: initialState.createEvent,
      };
    },
  },
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
      .addAsyncThunk(createEventThunk, {
        pending: (state) => {
          state.isPending = true;
          state.isFulfilled = false;
          state.isRejected = false;
          state.error = null;
        },
        fulfilled: (state, { payload }) => {
          state.dataEvent.push(payload);
          state.isPending = false;
          state.isFulfilled = true;
        },
        rejected: (state, { payload }) => {
          state.isPending = false;
          state.isRejected = true;
          state.error = payload;
        },
      })
      .addAsyncThunk(editEventThunk, {
        pending: (state) => {
          state.isPending = true;
          state.isFulfilled = false;
          state.isRejected = false;
          state.error = null;
        },
        fulfilled: (state, { payload }) => {
          state.dataEvent = state.dataEvent.map(ele => {
            if(ele.id === payload.id) {
              return payload
            }
            return ele
          })
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

export const {
  nextStep,
  prevStep,
  setBasic,
  setDateLocation,
  setSpeakers,
  removeSpeakers,
  setCategory,
  removeCategory,
  resetState
} = eventSlices.actions;

export default eventSlices.reducer;
