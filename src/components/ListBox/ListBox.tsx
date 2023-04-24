import { Listbox } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import {FC} from "react";

type Option = { label: string; value: string };

interface SelectProps {
  options: Option[];
  currentOption: Option;
  handleSelectOption: (option: Option) => void;
  label: string;
}

const ListBox: FC<SelectProps> = ({
  options,
  currentOption,
  handleSelectOption,
  label,
}) => (
  <div className="mb-2">
    <label htmlFor="select-box" className="block text-sm font-medium text-gray-700 dark:text-white">
      {label}:
    </label>
    <Listbox value={currentOption} onChange={handleSelectOption}>
      <div className="relative mt-1">
        <Listbox.Button id="select-box" className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
          <span className="block truncate">{currentOption.label}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <FontAwesomeIcon
              icon={faChevronDown}
              className="h-5 w-5 text-gray-400"
            />
          </span>
        </Listbox.Button>

        <Listbox.Options className="absolute z-50 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          {options.map((option) => (
            <Listbox.Option
              key={option.value}
              value={option}
              className={({ active }) =>
                `${active ? 'text-white bg-blue-600' : 'text-gray-900'}
                          cursor-pointer select-none relative py-2 pl-3 pr-9`
              }
            >
              {({ selected, active }) => (
                <>
                  <span
                    className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}
                  >
                    {option.label}
                  </span>
                  {selected ? (
                    <span
                      className={`${active ? 'text-white' : 'text-blue-600'}
                                      absolute inset-y-0 right-0 flex items-center pr-4`}
                    >
                      <FontAwesomeIcon icon={faCheck} className="h-5 w-5" />
                    </span>
                  ) : null}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  </div>
);
export default ListBox;
