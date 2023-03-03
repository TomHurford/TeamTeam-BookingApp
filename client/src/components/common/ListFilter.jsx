import React from "react";

const ListFilter = ({ categories }) => {
  return (
    <ul className="list-group">
      <li className="list-group-item active">All</li>
      {categories.map((category) => (
        <li key={category} className="list-group-item">
          {category}
        </li>
      ))}
    </ul>
  );
};

export default ListFilter;
