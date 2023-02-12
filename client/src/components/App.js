import Home from './Home'
import '../styles/App.css';
import React from 'react';
import Contact from './Contact';
import {Routes, Route} from 'react-router-dom';
import Navbar from './Navbar';
import EventDetails from './EventDetails';

//Routes to connect to the homepage, the contact page and other pages which can be added here

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path = "/" element={<Home/>}></Route>
        <Route path = "/contact" element={<Contact/>}></Route>
        <Route path = "/event-details" element={<EventDetails/>}></Route>
      </Routes>
    </div>
  )
  
}

export default App;

