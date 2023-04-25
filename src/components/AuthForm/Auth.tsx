import {FieldError, useForm} from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@/components/Input/Input";
import {useCallback} from "react";
import {getMovies, login, register as registerAction} from "../../../store/movie";
import {batch, useDispatch} from "react-redux";
import {IAuthFormProps, ILoginInputs, IRegisterInputs} from "@/components/AuthForm/types";
import {closeModal} from "../../../store/modal";

export const AuthForm = ({ type }: IAuthFormProps) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState, watch } = useForm( type === "login" ? {
    resolver: zodResolver(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    ),
    mode: "onSubmit",
  } : {
    resolver: zodResolver(
      z.object({
        email: z.string(),
        name: z.string(),
        password: z.string(),
        confirmPassword: z.string(),
      })
    ),
    mode: "onSubmit",
  });
  const { errors } = formState;


  const sendHandlerLogin = useCallback(async () => {
    console.log("sendHandlerLogin", watch("email"), watch("password"))
    dispatch(login(({
      email: watch("email"),
      password: watch("password"),
    } as ILoginInputs))).then(() => {
      batch(() => {
        dispatch(closeModal());
        dispatch(getMovies());
      });
    });
  }, [dispatch, watch]);
  const sendHandlerRegister = useCallback(async () => {
    dispatch(registerAction(({
      email: watch("email"),
      name: watch("name"),
      password: watch("password"),
      confirmPassword: watch("confirmPassword"),
    } as IRegisterInputs))).then(() => {
      batch(() => {
        dispatch(closeModal());
        dispatch(getMovies());
      });
    });
  }, [dispatch, watch]);
  const submitHandler = () => type === "login" ? sendHandlerLogin() : sendHandlerRegister();
  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Input
        title={"Email"}
        placeholder={"Default: oleksandr.sekker@gmail.com"}
        type={"text"}
        register={register}
        name="email"
        errors={errors.email as FieldError}
        className={"flex flex-col py-2"}
      />
      {type === "register" ? (      <Input
        title={"Name"}
        placeholder={"Type name here..."}
        type={"text"}
        register={register}
        name="name"
        errors={errors.name as FieldError}
        className={"flex flex-col"}
      />) : null}
      <Input
        title={"Password"}
        placeholder={"Default: super-password"}
        type={"text"}
        register={register}
        name="password"
        errors={errors.password as FieldError}
        className={"flex flex-col"}
      />
      {type === "register" ? (      <Input
        title={"confirmPassword"}
        placeholder={"Type confirmPassword here..."}
        type={"text"}
        register={register}
        name="confirmPassword"
        errors={errors.confirmPassword as FieldError}
        className={"flex flex-col"}
      />) : null}

      <button
        type={"submit"}
        className="mt-4 w-full rounded-2xl bg-blue-500 p-4 text-gray-100 dark:bg-gray-800"
      >
        {"submit"}
      </button>
    </form>
  );
};
