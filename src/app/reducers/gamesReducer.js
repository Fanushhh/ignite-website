import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  newGamesURL,
  popularGamesUrl,
  upcomingGamesUrl,
  searchedGameUrl,
} from "../../api";
import axios, { AxiosHeaders } from "axios";

export const gamesInitialState = {
  popular: [],
  newGames: [],
  upcomingGames: [],
  searched: [],
  isLoading: true,
  error: null,
};
export const fetchAllGames = createAsyncThunk(
  "games/fetchAllGamesStatus",
  async () => {
    const popularGames = await axios.get(popularGamesUrl());

    const upcomingGames = await axios.get(upcomingGamesUrl());
    const newGames = await axios.get(newGamesURL());
    const payload = {
      popularGames: popularGames.data.results,
      upcomingGames: upcomingGames.data.results,
      newGames: newGames.data.results,
    };

    return payload;
  }
);

export const fetchSearchedGame = createAsyncThunk(
  "games/fetchSearchedGame",
  async (searchedGame) => {
    const results = await axios.get(searchedGameUrl(searchedGame));
    return results;
  }
);

export const gamesSlice = createSlice({
  name: "games",
  initialState: gamesInitialState,
  reducers: {},
  extraReducers: (builder) => {
    //Fetch popular games
    builder.addCase(fetchAllGames.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchAllGames.fulfilled, (state, action) => {
      state.isLoading = false;
      state.popular = action.payload.popularGames;
      state.upcomingGames = action.payload.upcomingGames;
      state.newGames = action.payload.newGames;

      state.error = null;
    });
    builder.addCase(fetchAllGames.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    //Fetch searched game
    builder.addCase(fetchSearchedGame.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSearchedGame.fulfilled, (state, action) => {
      state.isLoading = false;
      state.searched = action.payload.data.results;
    });
    builder.addCase(fetchSearchedGame.rejected, (state) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default gamesSlice.reducer;
