import React, { useState } from "react";
import { useDataContext } from "../hooks/useDataContext";
import { IPhoneNumber } from "../interfaces";

export default function SearchableSelect(props: {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  availableNumbers: IPhoneNumber[];
}) {
  const { searchTerm, setSearchTerm } = props;
  const { availableNumbers } = useDataContext();

  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setShowDropdown(true);
  };

  const handleOptionClick = (option: IPhoneNumber) => {
    setSearchTerm(option.phoneNumber);
    setShowDropdown(false);
  };

  const filteredOptions = availableNumbers.filter((option) =>
    option.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-[95%]">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="block w-full px-4 py-2 bg-gray-100 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        onClick={() => setShowDropdown(true)}
      />
      {showDropdown && searchTerm && (
        <ul className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <li
                key={option.phoneNumber}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-black"
                onClick={() => handleOptionClick(option)}
              >
                {option.phoneNumber}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">No hay resultados</li>
          )}
        </ul>
      )}
    </div>
  );
}
