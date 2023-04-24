import React from 'react';
import {IMovieText} from "@/components/Movie/Types";

const TextMovie = ({ text } : IMovieText) => {
  return (
    <p className="text-center text-2xl tracking-wider text-white dark:text-black">
      {text || "Default Movie Title"}
    </p>
  );
};

export default TextMovie;
