import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../../api/interceptor"

const initialState = {
    dataDashboard: {
        stats: null,
        users: null,
        events: null,
        communities: null
    },
    isPending: false,
    isFulfilled: false,
    isRejected: false,
    error: null,
}

export const getStatsAdmin = createAsyncThunk(
    "stats_admin",
    async (_, { getState, rejectWithValue }) => {
        const { token } = getState().loggedUserState
        try {
            const response = await api.get(`http://localhost:9000/admin`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data.Data
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)

export const getAllUsers = createAsyncThunk(
    "allUsers_admin",
    async (_, { getState, rejectWithValue }) => {
        const { token } = getState().loggedUserState
        try {
            const response = await api.get(`http://localhost:9000/admin/users`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data.Data
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)

export const getAllEvents = createAsyncThunk(
    "allEvents_admin",
    async (_, { getState, rejectWithValue }) => {
        const { token } = getState().loggedUserState
        try {
            const response = await api.get(`http://localhost:9000/admin/events`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data.Data
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)

export const getAllCommunities = createAsyncThunk(
    "allCommunities_admin",
    async (_, { getState, rejectWithValue }) => {
        const { token } = getState().loggedUserState
        try {
            const response = await api.get(`http://localhost:9000/admin/communities`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data.Data
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)


const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        return builder.addAsyncThunk(getStatsAdmin, {
            pending: (state) => {
                state.isPending = true;
                state.isFulfilled = false;
                state.isRejected = false;
                state.error = null;
            },
            fulfilled: (state, { payload }) => {
                state.dataDashboard.stats = payload;
                state.isPending = false;
                state.isFulfilled = true;
            },
            rejected: (state, { payload }) => {
                state.isPending = false;
                state.isRejected = true;
                state.error = payload;
            },
        }).addAsyncThunk(getAllUsers, {
            pending: (state) => {
                state.isPending = true;
                state.isFulfilled = false;
                state.isRejected = false;
                state.error = null;
            },
            fulfilled: (state, { payload }) => {
                state.dataDashboard.users = payload;
                state.isPending = false;
                state.isFulfilled = true;
            },
            rejected: (state, { payload }) => {
                state.isPending = false;
                state.isRejected = true;
                state.error = payload;
            },
        }).addAsyncThunk(getAllEvents, {
            pending: (state) => {
                state.isPending = true;
                state.isFulfilled = false;
                state.isRejected = false;
                state.error = null;
            },
            fulfilled: (state, { payload }) => {
                state.dataDashboard.events = payload;
                state.isPending = false;
                state.isFulfilled = true;
            },
            rejected: (state, { payload }) => {
                state.isPending = false;
                state.isRejected = true;
                state.error = payload;
            },
        }).addAsyncThunk(getAllCommunities, {
            pending: (state) => {
                state.isPending = true;
                state.isFulfilled = false;
                state.isRejected = false;
                state.error = null;
            },
            fulfilled: (state, { payload }) => {
                state.dataDashboard.communities = payload;
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
})

export default adminSlice.reducer