import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../utils";

export const getRecommendation = createAsyncThunk(
  "recommendation/getRecommendation",
  async () => {
    const backendUrl = process.env.NODE_ENV === "production" ? '' : process.env.REACT_APP_BE;
    const { data } = await client(`${backendUrl}/courses`);
    return data;
  }
);

const recommendationSlice = createSlice({
  name: "recommendation",
  initialState: {
    isFetching: true,
    courses: [],
  },
  reducers: {
    addToRecommendation(state, action) {
      state.courses = [action.payload, ...state.courses];
    },
  },
  extraReducers: {
    [getRecommendation.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.courses = action.payload;
    },
  },
});

export const { addToRecommendation } = recommendationSlice.actions;

export default recommendationSlice.reducer;
