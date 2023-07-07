import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from "./reducers/gamesReducer";
import gameDetailsReducer from "./reducers/gameDetailsReducer";

export default configureStore({
  reducer: {
    games: gamesReducer,
    gameDetails: gameDetailsReducer,
  },
});
