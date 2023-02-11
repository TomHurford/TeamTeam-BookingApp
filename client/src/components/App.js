

import '../styles/App.css';
import React from 'react';

import {Routes, Route} from 'react-router-dom';
import Navbar from './Navbar';
import Purchase from './Past';
import PayPal from './PayPal';


function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route exact path = "/Purchase" element={<Purchase/>}></Route>
        
        <Route exact path = "/PayPal" element={<PayPal/>}></Route>
      </Routes>
    </div>
  )
  
}

export default App;
