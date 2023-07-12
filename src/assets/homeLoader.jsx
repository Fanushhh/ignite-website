import { useParams } from "react-router-dom";
import { fetchAllGames } from "../app/reducers/gamesReducer";
import store from "../app/store";

export const homeLoader = async (id) => {
  if (store.getState().games.popular.length < 1) {
    try {
      // State update should happen here using dispatch.
      return store.dispatch(fetchAllGames(id));

      return response;
    } catch (err) {
      console.log(err);
    }
  } else {
    return null;
  }
};
