import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
  speakers: [],
  attendees: [],
};

const createEventSlices = createSlice({
  name: "createEvent",
  initialState,
  reducers: {
    nextStep: (prev) => {
      if (prev.step < 3) {
        return {
          ...prev,
          step: prev.step + 1,
        };
      }
    },
    prevStep: (prev) => {
      if (prev.step > 1) {
        return {
          ...prev,
          step: prev.step - 1,
        };
      }
    },
    setBasic: (prev, { payload }) => {
      return {
        ...prev,
        basic: {
          ...prev.basic,
          ...payload,
        },
      };
    },
    setDateLocation: (prev, { payload }) => {
      return {
        ...prev,
        dateLocation: {
          ...prev.dateLocation,
          ...payload,
        },
      };
    },
    setSpeakers: (prev, { payload }) => {
      return {
        ...prev,
        speakers: [...prev.speakers, payload]
      };
    },
    removeSpeakers: (prev, { payload }) => {
      return {
        ...prev,
        speakers: prev.speakers.filter((ele) => ele.name !== payload),
      };
    },
    setCategory: (prev, { payload }) => {
      return {
        ...prev,
        basic: {
          ...prev.basic,
          category: [...prev.basic.category, payload],
        },
      };
    },
    removeCategory: (prev, { payload }) => {
      return {
        ...prev,
        basic: {
          ...prev.basic,
          category: prev.basic.category.filter((ele) => ele !== payload),
        },
      };
    },
    resetState: (prev) => {
      return{
        ...prev
      }
    }
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
} = createEventSlices.actions;

export default createEventSlices.reducer;
