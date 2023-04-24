import {FieldError, useForm} from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@/components/Input/Input";
import {useCallback} from "react";
import {createMovie, getMovies} from "../../../store/movie";
import {batch, useDispatch} from "react-redux";
import {closeModal} from "../../../store/modal";
interface IMovieFormInputs {
    title: string;
    year: number;
    format: string;
    actors: string[];
}

export const MovieForm = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState, watch } = useForm({
    resolver: zodResolver(
      z.object({
        title: z.string(),
        year: z.string(),
        format: z.string(),
        actors: z.string(),
      })
    ),
    mode: "onSubmit",
  });
  const { errors } = formState;
  const getActors = useCallback(() => {
    if (watch("actors") && typeof watch("actors") === "string") {
      return watch("actors").split(",");
    }
    if (Array.isArray(watch("actors"))) {
      return watch("actors");
    }
    return [""];
  }, [watch]);

  const sendHandler = useCallback(async () => {

    dispatch(createMovie(({
      title: watch("title"),
      year: watch("year"),
      format: watch("format"),
      actors: getActors(),
    } as IMovieFormInputs))).then(() => {
      batch(() => {
        dispatch(getMovies());
        dispatch(closeModal())
      })
    });
  }, [dispatch, getActors, watch]);

  return (
    <form onSubmit={handleSubmit(sendHandler)}>
      <Input
        title={"Title"}
        placeholder={"Type your title"}
        type={"text"}
        register={register}
        name="title"
        errors={errors.title as FieldError}
        className={"flex flex-col py-2"}
      />
      <Input
        title={"Year"}
        placeholder={"Type year here..."}
        type={"text"}
        register={register}
        name="year"
        errors={errors.year as FieldError}
        className={"flex flex-col"}
      />
      <Input
        title={"Format"}
        placeholder={"Type format here..."}
        type={"text"}
        register={register}
        name="format"
        errors={errors.format as FieldError}
        className={"flex flex-col"}
      />
      <Input
        title={"Actors"}
        placeholder={"Type actors here..."}
        type={"text"}
        register={register}
        name="actors"
        errors={errors.actors as FieldError}
        className={"flex flex-col"}
      />

      <button
        type={"submit"}
        className="mt-4 w-full rounded-2xl bg-blue-500 p-4 text-gray-100 dark:bg-gray-800"
      >
        {"submit"}
      </button>
    </form>
  );
};
