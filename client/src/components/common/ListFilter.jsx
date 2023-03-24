import React from "react";

// This is a functional component that renders a list of categories 
const ListFilter = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
    <ul className="list-group">
      {categories.map((category) => (
        <li
          onClick={() => onCategorySelect(category)}
          key={category}
          className={
            category === selectedCategory
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {category}
        </li>
      ))}
    </ul>
  );
};

export default ListFilter;
