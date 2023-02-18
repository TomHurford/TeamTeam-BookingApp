import React, { Component } from "react";
import Pagination from "./pagination";
import { getSocieties } from "../societies/fakeSocieties";
import { paginate } from "../utils/paginate";
import SearchBar from "./searchBar";
import { Link } from "react-router-dom";
import CreateSocietyForm from "./createSocietyForm";
import { Button } from "bootstrap";

class SearchSocieties extends Component {
  state = {
    societies: getSocieties(), // bad implementation, will change later
    currentPage: 1,
    pageSize: 5,
    searchQuery: " ",
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  render() {
    const { pageSize, currentPage } = this.state;

    const societies = paginate(this.state.societies, currentPage, pageSize);

    return (
      <React.Fragment>
        <h2>Societies</h2>
        <SearchBar onChange={this.handleSearch} />

        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Followers</th>
              <th>Number of Events</th>
            </tr>
          </thead>
          <tbody>
            {societies.map((society) => (
              <tr>
                <td>
                  <a href={`/societies/${society.id}/${society.name}`}>
                    {society.name}
                  </a>
                  {/* TODO: Use Link */}
                </td>
                <td>{society.category.name}</td>
                <td>{society.numberOfFollowers}</td>
                <td>{society.numberOfEvents}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          itemsCount={this.state.societies.length}
          pageSize={this.state.pageSize}
          currentPage={this.state.currentPage}
          onPageChange={this.handlePageChange}
        />
        <Link to="/create-society">
          <button className="btn btn-primary" style={{ marginRight: "15px" }}>
            Create Society
          </button>
        </Link>

        <Link to="/edit-society">
          <button className="btn btn-primary">Edit Society</button>
        </Link>

        {/* TODO: Use destructuring */}
      </React.Fragment>
    );
  }
}

export default SearchSocieties;
