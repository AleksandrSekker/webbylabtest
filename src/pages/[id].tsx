import React, {useEffect} from "react";
import { useRouter } from "next/router";
import { CircleLoader } from "react-spinners";
import TextMovie from "@/components/Movie/TextMovie";
import {baseURL} from "@/constants/general";

interface IMovieItem {
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

  const [movie, setMovie] = React.useState<IMovieItem>();
  const [isLoading, setIsLoading] = React.useState(true);

  const getMovie = async () => {
    const response = await fetch(`${baseURL}movies/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJvbGVrc2FuZHIuc2Vra2VyQGdtYWlsLmNvbSIsIm5hbWUiOiJPbGVrc2FuZHIgU2Vra2VyIiwiY3JlYXRlZEF0IjoiMjAyMy0wNC0yMVQwOToxNzoxMS4xNzFaIiwidXBkYXRlZEF0IjoiMjAyMy0wNC0yMVQwOToxNzoxMS4xNzFaIiwiaWF0IjoxNjgyMDY4NjMxfQ.rIdvdT3vh1DXmVHu6VWSJniukU84zcBXF5ui_Oxj6H0'
      }
    });
    const data = await response.json();
    console.log(data.data);
    setMovie(data.data);
    setIsLoading(false);
  }
  useEffect(() => {
    if (id) {
      getMovie()
    }
  }, []);
  return isLoading ? (
    <CircleLoader className={"mx-auto"} color="#36d7b7" />
  ) : (
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
  );
};

export default MovieItem;
