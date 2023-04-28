import React, {useEffect} from "react";
import { useRouter } from "next/router";
import { CircleLoader } from "react-spinners";
import TextMovie from "@/components/Movie/TextMovie";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {getOneMovie, removeError} from "../../store/movie";
import ErrorMessage from "@/components/Message/Message";

export interface IMovieItem {
  id: number;
  title: string;
  year: number;
  format: string;
  actors: {
    id: number;
    name: string;
  }[];
}
const MovieItem = () => {
  const router = useRouter();
  const { id } = router.query;
  const { movie, isLoading, error } = useSelector((state: RootState) => state.movies);
  const dispatch = useDispatch();


  useEffect(() => {
    if (id) {
      console.log(id)
      console.log('getOneMovie', getOneMovie({id: id}))
      dispatch(getOneMovie(id));
    }
  }, [dispatch, id]);
  if (isLoading) {
    return <CircleLoader className={"mx-auto"} color="#36d7b7" />;
  }

  if (error) {
    return <ErrorMessage show={!!error.length} message={error} removeError={() => dispatch(removeError())} />
  }

  return (
    <div>
      <div className="text-center">
        <h3 className={'text-2xl font-bold dark:text-white text-blue-300 my-4'} >You can back to home page by click on logo in header or this button</h3>
        <Link
          href="/"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded vertical-center text-xl"
        >
          Back to home
        </Link>
      </div>
      <div className="mx-auto my-4 flex flex max-w-screen-xl justify-center bg-blue-400 dark:bg-white rounded-2xl py-8">
        {movie && (
          <div>
            <TextMovie text={`ID: ${movie.id}`} />
            <TextMovie text={`Title: ${movie.title}`} />
            <TextMovie text={`Year: ${movie.year}`} />
            <TextMovie text={`Format: ${movie.format}`} />
            <TextMovie text={`Actors: ${movie.actors.map(actor => actor.name).join(', ')}`} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieItem;
