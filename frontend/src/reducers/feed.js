import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../utils";

export const getFeed = createAsyncThunk("feed/getFeed", async () => {
  const backendUrl = process.env.NODE_ENV === "production" ? '' : process.env.REACT_APP_BE;
  const { data } = await client(`${backendUrl}/users/feed`);
  return data;
});

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    isFetching: true,
    videos: [],
  },
  extraReducers: {
    [getFeed.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.videos = action.payload;
    },
  },
});

export default feedSlice.reducer;
