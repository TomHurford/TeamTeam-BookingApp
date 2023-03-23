import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

// This is a functional component that renders a pagination component
const Pagination = (props) => {
  const {
    itemsCount: elementCount,
    pageSize,
    currentPage,
    onPageChange,
  } = props;
  const pageCount = Math.ceil(elementCount / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  return (
    <ul className="pagination">
      {pages.map((page) => (
        <a
          key={page}
          href="#/"
          className="page-link"
          onClick={() => onPageChange(page)}
        >
          <li
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            {page}
          </li>
        </a>
      ))}
    </ul>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number,
  pageSize: PropTypes.number,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func,
};
export default Pagination;
