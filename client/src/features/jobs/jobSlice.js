import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jobsService from "./jobService";

const initialState = {
  jobs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const registerJob = createAsyncThunk(
  "jobs/registerJob",
  async (jobs, thunkAPI) => {
    try {
      return await jobsService.registerJob(jobs);
    } catch (error) {
      const message =
        (error.reponse && error.response.data && error.reponse.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllJobs = createAsyncThunk("jobs/getAllJobs");

export const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.jobs = action.payload;
      })
      .addCase(registerJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.jobs = [];
      });
  },
});

export const { reset } = jobSlice.actions;
export default jobSlice.reducer;
