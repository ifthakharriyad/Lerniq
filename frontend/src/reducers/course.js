import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../utils";

export const getCourse = createAsyncThunk(
  "course/getCourse",
  async (courseId, thunk) => {
    const { data } = await client(
      `${process.env.REACT_APP_BE}/courses/${courseId}`
    );
    return data;
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState: {
    isFetching: true,
    data: {},
  },
  reducers: {
    clearCourse(state, action) {
        state.isFetching = true;
        state.data = {};
    },
  },
  extraReducers: {
    [getCourse.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.data = action.payload;
    },
    },
});
export const {
  clearCourse,
} = courseSlice.actions;


export default courseSlice.reducer;


