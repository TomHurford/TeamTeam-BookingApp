import Home from './Home'
import '../styles/App.css';
import React from 'react';
import Contact from './Contact';
import {Routes, Route} from 'react-router-dom';
import Navbar from './Navbar';

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route exact path = "/" element={<Home/>}></Route>
        <Route exact path = "/contact" element={<Contact/>}></Route>
      </Routes>
    </div>
  )
  
}

export default App;

