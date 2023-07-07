import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchGameDetails } from "../app/reducers/gameDetailsReducer";
import { smallImage } from "../util";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

export const Game = ({ name, released, image, slug, id }) => {
  const stringPathId = id.toString();
  const params = useLocation();
  const dispatch = useDispatch();
  const handleClick = () => {
    document.body.style.overflow = "hidden";
    dispatch(fetchGameDetails(id));
  };

  return (
    <motion.div
      layout
      layoutId={stringPathId}
      onClick={handleClick}
      key={id}
      className=" flex flex-col justify-between gap-4 h-full text-center bg-slate-200 shadow-md rounded-lg overflow-hidden"
    >
      <Link
        className="flex gap-4 flex-col justify-between h-full"
        to={
          params.pathname.length > 1
            ? `${params.pathname}/game/${id}`
            : `game/${id}`
        }
        replace="true"
      >
        <div className="px-4 py-2">
          <motion.h3
            layoutId={`title ${stringPathId}`}
            className=" text-blue-950 font-bold"
          >
            {name}
          </motion.h3>
          <p className="text-xs text-slate-500">{released}</p>
        </div>
        <div className="">
          <motion.img
            layoutId={`image ${stringPathId}`}
            className="w-full object-cover h-[162px] block"
            src={smallImage(image, 640)}
            alt={slug}
          ></motion.img>
        </div>
      </Link>
    </motion.div>
  );
};
