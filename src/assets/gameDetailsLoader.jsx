import { fetchGameDetails } from "../app/reducers/gameDetailsReducer";
import store from "../app/store";

export const gameDetailsLoader = async (id) => {
  try {
    return store.dispatch(fetchGameDetails(id));
  } catch (err) {
    console.log(err);
  }
};
