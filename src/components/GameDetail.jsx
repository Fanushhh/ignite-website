import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { smallImage } from "../util";
import { motion } from "framer-motion";
import { useRef } from "react";
import parse from "html-react-parser";

export const GameDetail = ({ pathId }) => {
  const shadowClass = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split("/");
  const { screenshots, data, loading } = useSelector(
    (state) => state.gameDetails
  );

  const exitDetailHandler = (e) => {
    const element = shadowClass.current;
    if (element.classList.contains("shadowClass")) {
      document.body.style.overflow = "auto";
      if (currentPath.includes("new-games")) {
        navigate("/new-games");
      }
      if (currentPath.includes("upcoming-games")) {
        navigate("/upcoming-games");
      }
      if (currentPath.length < 4) {
        navigate("/");
      }
    }
  };

  return (
    <>
      {!loading && (
        <div
          onClick={exitDetailHandler}
          ref={shadowClass}
          className=" shadowClass w-full min-h-screen overflow-y-scroll bg-[rgba(0,0,0,0.5)] fixed top-0 left-0"
        >
          <motion.div
            layout
            layoutId={pathId}
            className=" w-[80%] rounded-2xl my-5 py-4 px-[1rem] bg-white absolute left-[10%] text-black"
          >
            <div className="flex justify-end " onClick={exitDetailHandler}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className=" w-6 h-6 hover:bg-slate-400 rounded-full cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div className="stats">
              <div className="rating">
                <motion.h1
                  layoutId={`title ${pathId}`}
                  className=" text-xl font-bold lg:text-3xl text-center"
                >
                  {data.name}
                </motion.h1>
                <p className=" text-gray-500 text-xl lg:text-sm text-center">
                  Rating: {data.rating} out of {data.rating_top}
                </p>
                <div className="info">
                  <h3 className="text-xl font-bold pt-4 lg:text-2xl">
                    Platforms
                  </h3>
                  <div className="platforms flex flex-wrap gap-4 py-2 text-xs">
                    {data.platforms.map((data) => (
                      <p key={data.platform.id}>{data.platform.name}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 w-full max-w-[650px] h-[50%] mx-auto">
              <motion.img
                layoutId={`image ${pathId}`}
                src={smallImage(data.background_image, 640)}
                alt={data.name}
              />
            </div>
            <div className="my-[2rem] text-xl lg:text-xs">
              {parse(data.description)}
            </div>
            <div className="flex gap-4 flex-wrap justify-center">
              {screenshots.map((image) => (
                <img
                  className=" w-full max-w-md"
                  src={smallImage(image.image, 640)}
                  alt={image.image}
                  key={image.id}
                />
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};
