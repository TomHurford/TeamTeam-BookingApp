import React from "react";

const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      name="query"
      className="form-control my-4"
      placeholder="Search for society..."
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
    />
  );
};

export default SearchBar;
