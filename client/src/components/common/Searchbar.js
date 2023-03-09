import React from "react";
import PropTypes from 'prop-types';

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

SearchBar.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default SearchBar;
