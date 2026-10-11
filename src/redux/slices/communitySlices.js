import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api/interceptor";

const initialState = {
  dataCommunity: [],
  detailCommunity: {
    communityInformation: null,
    communityEvents: null,
    communityMembers: null,
    communityDiscuss: null
  },
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

export const getDetailCommunity = createAsyncThunk(
  "detail_community",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:9000/community/detail/${payload}`)
      return response.data.Data
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

export const getEventCommunity = createAsyncThunk(
  "event_community",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:9000/community/event/${payload}`)
      return response.data.Data
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

export const getMembersCommunity = createAsyncThunk(
  "member_community",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:9000/community/members/${payload}`)
      return response.data.Data
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)

export const getDiscussCommunity = createAsyncThunk(
  "discuss_community",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:9000/community/discussions/${payload}`)
      return response.data.Data
    } catch (e) {
      return rejectWithValue(e)
    }
  }
)



const communitySlices = createSlice({
  name: "Community",
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
      })
      .addAsyncThunk(getDetailCommunity, {
        pending: (state) => {
          state.isPending = true;
          state.isFulfilled = false;
          state.isRejected = false;
          state.error = null;
        },
        fulfilled: (state, { payload }) => {
          state.detailCommunity.communityInformation = payload
          state.isPending = false;
          state.isFulfilled = true;
        },
        rejected: (state, { payload }) => {
          state.isPending = false;
          state.isRejected = true;
          state.error = payload;
        },
      })
      .addAsyncThunk(getEventCommunity, {
        pending: (state) => {
          state.isPending = true;
          state.isFulfilled = false;
          state.isRejected = false;
          state.error = null;
        },
        fulfilled: (state, { payload }) => {
          state.detailCommunity.communityEvents = payload
          state.isPending = false;
          state.isFulfilled = true;
        },
        rejected: (state, { payload }) => {
          state.isPending = false;
          state.isRejected = true;
          state.error = payload;
        },
      })
      .addAsyncThunk(getMembersCommunity, {
        pending: (state) => {
          state.isPending = true;
          state.isFulfilled = false;
          state.isRejected = false;
          state.error = null;
        },
        fulfilled: (state, { payload }) => {
          state.detailCommunity.communityMembers = payload
          state.isPending = false;
          state.isFulfilled = true;
        },
        rejected: (state, { payload }) => {
          state.isPending = false;
          state.isRejected = true;
          state.error = payload;
        },
      }).addAsyncThunk(getDiscussCommunity, {
        pending: (state) => {
          state.isPending = true;
          state.isFulfilled = false;
          state.isRejected = false;
          state.error = null;
        },
        fulfilled: (state, { payload }) => {
          state.detailCommunity.communityDiscuss = payload
          state.isPending = false;
          state.isFulfilled = true;
        },
        rejected: (state, { payload }) => {
          state.isPending = false;
          state.isRejected = true;
          state.error = payload;
        },
      })
  },
});

export default communitySlices.reducer;
