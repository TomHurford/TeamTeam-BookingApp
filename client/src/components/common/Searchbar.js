import React from "react";
import PropTypes from 'prop-types';

const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      name="query"
      className="searchBar"
      placeholder="Search for society..."
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
