import React, { Component } from "react";
import Pagination from "../common/Pagination";
import { paginate } from "../../utils/paginate";
import SearchBar from "../common/Searchbar";
import { Link } from "react-router-dom";
import ListFilter from "../common/ListFilter";
import axios from "axios";

class SearchSocieties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      societiesList: [], // bad implementation, will change later
      currentPage: 1,
      pageSize: 5,
      searchQuery: " ",
    };
  }

  async componentDidMount() {
    const { data: societiesList } = await axios.get(
      "http://localhost:5001/societies/getSocieties"
    );
    this.setState({ societiesList });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleCategorySelect = (category) => {
    this.setState({ selectedCategory: category, currentPage: 1 });
  };

  render() {
    const { pageSize, currentPage, selectedCategory } = this.state;

    const filtered =
      selectedCategory && selectedCategory !== "All"
        ? this.state.societiesList.filter(
            (society) => society.category === selectedCategory
          )
        : this.state.societiesList;

    const societies = paginate(filtered, currentPage, pageSize);

    return (
      <React.Fragment>
        <h2>Societies</h2>
        <SearchBar onChange={this.handleSearch} />

        <div className="row">
          <div className="col-2">
            <ListFilter
              categories={["All", "Sports", "Academic", "Social", "Other"]}
              selectedCategory={this.state.selectedCategory}
              onCategorySelect={this.handleCategorySelect}
            />
          </div>
          <div className="col">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Followers</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {societies.map((society) => (
                  <tr key={society.id}>
                    <td>
                      <Link to={`/society/${society.id}`}>{society.name}</Link>
                    </td>
                    <td>{society.category}</td>
                    <td>{society.members}</td>
                    <td>{society.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              itemsCount={filtered.length}
              pageSize={this.state.pageSize}
              currentPage={this.state.currentPage}
              onPageChange={this.handlePageChange}
            />
            <Link to="/create-society">
              <button
                className="btn btn-primary"
                style={{ marginRight: "15px" }}
              >
                Create Society
              </button>
            </Link>
            <Link to="/edit-society">
              <button className="btn btn-primary">Edit Society</button>
            </Link>
            {/* TODO: Use destructuring */}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SearchSocieties;
