import Link from "next/link";
import React  from "react";
import { motion } from "framer-motion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTrash, faRightToBracket} from "@fortawesome/free-solid-svg-icons";
import {IProjectItemProps} from "@/components/Movie/Types";
import TextMovie from "./TextMovie";
import { useDispatch} from "react-redux";
import { deleteMovie, getMovies } from "../../../store/movie";
const Movie = ({
  id,
  title,
  year,
  format,
}: IProjectItemProps) => {
  const dispatch = useDispatch();
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      exit={{ x: -100, opacity: 0 }}
      className="flex items-center mt-2 justify-around rounded-xl shadow-md shadow-gray-900 bg-blue-500 dark:bg-white  hover:bg-blue-400 dark:shadow-md dark:shadow-gray-400 dark:hover:bg-gray-500">

      <TextMovie text= {title || "Default Movie Title"} />
      <TextMovie text= {year || "Default Movie Year"} />
      <TextMovie text= {format || "Default Movie Format"} />

      <button id="delete" type="button" className="text-red-600" onClick={() => {
        dispatch(deleteMovie(id)).then(() => {
          dispatch(getMovies())})
      }}>
        <FontAwesomeIcon icon={faTrash} className="" />
      </button>
      <Link className={"decoration-none text-blue-700"} href={`${id}`}>
        <FontAwesomeIcon icon={faRightToBracket} className="" />
      </Link>
    </motion.div>
  );
};

export default Movie;
