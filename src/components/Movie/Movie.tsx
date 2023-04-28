import Link from "next/link";
import React  from "react";
import { motion } from "framer-motion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTrash, faRightToBracket} from "@fortawesome/free-solid-svg-icons";
import {IProjectItemProps} from "@/components/Movie/Types";
import TextMovie from "./TextMovie";
import { useDispatch} from "react-redux";
import {openModal} from "../../../store/modal";
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
      className="grid md:grid-cols-5 gap-4 mt-2 rounded-xl shadow-md shadow-gray-900 bg-blue-500 dark:bg-white  hover:bg-blue-400 dark:shadow-md dark:shadow-gray-400 dark:hover:bg-gray-500">
      <div className="m-auto">
        <TextMovie text= {title || "Default Movie Title"} />
      </div>
      <div className="m-auto">
        <TextMovie text= {year || "Default Movie Year"} />
      </div>
      <div className="m-auto">
        <TextMovie text= {format || "Default Movie Format"} />
      </div>
      <button id={String(id)} type="button" className="text-red-600" onClick={() => {
        // dispatch(deleteMovie(id)).then(() => {
        //   dispatch(getMovies())})
        dispatch(openModal(`deleteMovie_${id}`))
      }}>
        <FontAwesomeIcon icon={faTrash} className="" />
      </button>
      <Link className={"decoration-none text-blue-700 m-auto"} href={`${id}`}>
        <FontAwesomeIcon icon={faRightToBracket} className="" />
      </Link>

    </motion.div>
  );
};

export default Movie;
