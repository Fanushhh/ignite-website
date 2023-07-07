import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllGames } from "../app/reducers/gamesReducer";
import { Game } from "../components/Game";
import { useLocation } from "react-router-dom";
import { GameDetail } from "../components/GameDetail";
import { AnimatePresence, LayoutGroup } from "framer-motion";

export const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllGames());
  }, []);
  const location = useLocation();
  const gamePath = location.pathname.split("/")[2];
  const { popular, searched } = useSelector((state) => state.games);
  const isLoading = useSelector((state) => state.isLoading);
  const error = useSelector((state) => state.error);

  if (isLoading) {
    return "loading...";
  }

  if (error) {
    return error;
  }

  return (
    <div className="text-black text-xl p-4 w-full max-w-[1100px] mx-auto">
      <LayoutGroup>
        <AnimatePresence>
          {gamePath && <GameDetail pathId={gamePath} />}
        </AnimatePresence>
        {searched.length > 1 && (
          <div>
            <h2 className=" text-3xl text-center font-extrabold text-blue-950 mb-20">
              Search Results
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 items-center gap-4 mb-10">
              {!isLoading &&
                searched.map((game) => {
                  return (
                    <Game
                      key={game.id}
                      name={game.name}
                      released={game.released}
                      id={game.id}
                      slug={game.slug}
                      image={game.background_image}
                    />
                  );
                })}
            </div>
          </div>
        )}
        <h2 className=" text-3xl text-center font-extrabold text-blue-950 mb-20">
          Popular Games
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 items-center gap-4 mb-10">
          {!isLoading &&
            popular.map((game) => {
              return (
                <Game
                  key={game.id}
                  name={game.name}
                  released={game.released}
                  id={game.id}
                  slug={game.slug}
                  image={game.background_image}
                />
              );
            })}
        </div>
      </LayoutGroup>
    </div>
  );
};
