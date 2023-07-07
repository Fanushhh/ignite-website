import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchSearchedGame } from "../app/reducers/gamesReducer";

export const Nav = () => {
  const [clicked, setClicked] = useState(false);
  const [textInput, setTextInput] = useState("");
  const dispatch = useDispatch();
  const toggleMenu = () => {
    setClicked(!clicked);
  };

  const handleInputChange = (e) => {
    setTextInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchSearchedGame(textInput));
    setTextInput("");
  };

  return (
    <nav className="bg-slate-200 text-black py-5 px-5 flex justify-center">
      <div className="w-full max-w-[1100px] px-4 flex justify-between items-center">
        <Link to="/">
          <h2>Game Spotter</h2>
        </Link>
        <div
          onClick={toggleMenu}
          className="hover:cursor-pointer hover:text-slate-950 transition-all hidden max-[620px]:block"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
        <ul
          className={`flex justify-between gap-5 max-[620px]:${
            clicked ? "absolute" : "hidden"
          } top-20 right-2 max-[620px]:bg-slate-500 max-[620px]:py-10 max-[620px]:px-4 rounded-md text-center max-[620px]:flex-col`}
        >
          <Link to="/upcoming-games">
            <li>Upcoming games</li>
          </Link>
          <Link to="/new-games">
            <li>New Games</li>
          </Link>
        </ul>
        <form className="flex max-[620px]:hidden" onSubmit={handleSubmit}>
          <input
            className=" bg-white py-2 px-4 rounded-l-[.5rem] max-w-[250px] w-full text-black focus:outline-none"
            type="text"
            name=""
            value={textInput}
            onChange={handleInputChange}
          />
          <button className=" bg-red-400 hover:bg-red-500 transition-all  py-2 px-4 rounded-r-[.5rem]">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};
