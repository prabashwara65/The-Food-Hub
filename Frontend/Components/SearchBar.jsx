import React from "react";

const SearchBar = ({value,onChange, placeholder = "Search By Restaurant" }) => {
  return (
    <div className="relative p-1 w-full max-w-3xl">
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full focus:outline-none py-3 bg-[#EFEEFE] focus:shadow-amber-600 focus:shadow-sm rounded-full px-4"
        placeholder={placeholder}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-8 absolute right-4 top-3.5 text-gray-400"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    </div>
  );
};

export default SearchBar;
