import React from "react";
import PropTypes from "prop-types";

// This is a functional component that renders a search bar
const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      name="query"
      className="searchBar"
      placeholder="Search for society..."
      minLength="1"
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
    />
  );
};

SearchBar.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default SearchBar;
