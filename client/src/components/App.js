// import logo from "../assets/logo.svg";
import "../styles/App.css";
import { Routes, Route } from "react-router-dom";
import React, { Component } from "react";
import ViewSociety from "./viewSociety";
import CreateSocietyForm from "./createSocietyForm";
import SearchSocieties from "./searchSocieties";

class App extends Component {
  render() {
    return (
      <main className="container">
        <Routes>
          <Route path="/societies/:id/:name?" element={<ViewSociety />} />
          <Route path="/societies" element={<SearchSocieties />} />

          <Route path="/create-society" element={<CreateSocietyForm />} />
        </Routes>
      </main>
    );
  }
}

export default App;
