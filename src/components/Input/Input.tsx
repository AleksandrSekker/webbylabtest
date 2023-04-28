import React from "react";
import { motion } from "framer-motion";
import {
  type FieldError,
  type FieldValues,
  type UseFormRegister,
} from "react-hook-form";

interface InputProps {
    title: string;
    placeholder: string;
    type: string;
    className: string;
    name: string;
    register: UseFormRegister<FieldValues>;
    errors: FieldError | undefined;
}

const Input = ({
  title,
  placeholder,
  type,
  className,
  name,
  register,
  errors,
}: InputProps) => {
  const isErrorExist = Object.keys(errors ? errors : {}).length > 0;
  return (
    <div className={className}>
      <label className="mb-2 block text-sm font-medium text-gray-900">
        {title}
      </label>
      {type === "textarea" ? (
        <textarea
          placeholder={placeholder}
          {...register(name)}
          className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 shadow-sm outline-0 "
        ></textarea>
      ) : (
        <input
          className="block w-full rounded-lg border border-gray-300  p-2.5 text-sm text-gray-900 shadow-sm outline-0"
          type={type}
          placeholder={placeholder}
          {...register(name, (type === "number" ? { valueAsNumber: true } : {}))}
        />
      )}
      {isErrorExist && (
        <motion.p
          animate={{ y: [-10, 0], opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0, scale: 0.5 }}
          className="mt-2 text-red-600"
        >
          {errors?.message}
        </motion.p>
      )}
    </div>
  );
};

export default Input;
