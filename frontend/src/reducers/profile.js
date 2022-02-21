import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../utils";

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (userId, thunk) => {
    const backendUrl = process.env.NODE_ENV === "production" ? '' : process.env.REACT_APP_BE;
    const { data } = await client(
      `${backendUrl}/users/${userId}`
    );
    return data;
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    isFetching: true,
    data: {},
  },
  reducers: {
    updateProfile(state, action) {
      state.data = {
        ...state.data,
        ...action.payload,
      };
    },
    clearProfile(state, action) {
      state.isFetching = true;
      state.data = {};
    },
  },
  extraReducers: {
    [getProfile.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.data = action.payload;
    },
    },
});

export const {
  updateProfile,
  clearProfile,
} = profileSlice.actions;

export default profileSlice.reducer;
