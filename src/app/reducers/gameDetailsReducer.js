import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { gameDetailsGet, gameScreenshotGet } from "../../api";
import axios from "axios";

const initialState = {
  data: { platforms: [] },
  screenshots: [],
  loading: false,
  error: null,
};

// Define the async thunk to fetch data
export const fetchGameDetails = createAsyncThunk(
  "gameDetails/fetchGameDetails",
  async (id) => {
    // Perform your API request here
    const gameDetails = await axios.get(gameDetailsGet(id));
    const gameScreenshots = await axios.get(gameScreenshotGet(id));
    const payload = {
      details: gameDetails.data,
      screenshots: gameScreenshots.data.results,
    };
    return payload;
  }
);
// Create the slice
const gameDetailsSlice = createSlice({
  name: "gameDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGameDetails.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchGameDetails.fulfilled, (state, action) => {
      state.data = action.payload.details;
      state.screenshots = action.payload.screenshots;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchGameDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default gameDetailsSlice.reducer;
