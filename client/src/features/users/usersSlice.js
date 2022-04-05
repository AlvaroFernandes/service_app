import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usersService from "./usersService";

const initialState = {
  users: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//get user information
export const getUser = createAsyncThunk(
  "/users/getUser",
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await usersService.getUserInfo(userId, token);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.users = null;
      });
  },
});
