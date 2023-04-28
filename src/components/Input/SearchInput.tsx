import React, { ChangeEvent, useEffect, useState } from "react";

interface SearchInputProps {
    title: string;
    placeholder: string;
    type: string;
    className?: string;
    name: string;
    value: string | number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    debounceDelay?: number;
}

const SearchInput = ({
  title,
  placeholder,
  type,
  className = "",
  value,
  onChange,
  debounceDelay = 500,
}: SearchInputProps) => {
  const [searchValue, setSearchValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {onChange({ target: { value: searchValue } } as ChangeEvent<HTMLInputElement>)}, debounceDelay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue, debounceDelay, onChange]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className={className}>
      <label className="mb-2 block text-sm font-medium text-gray-900">
        {title}
      </label>
      <input
        className="block w-full rounded-lg border border-gray-300  p-2.5 text-sm text-gray-900 shadow-sm outline-0"
        type={type}
        placeholder={placeholder}
        value={searchValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchInput;
