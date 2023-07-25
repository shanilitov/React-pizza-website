import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Outlet, useNavigate, Navigate } from 'react-router-dom';
import Home from './componenets/Home';
import Branches from './componenets/Branches';
import Menu from './componenets/Menu';
import Pizza from './componenets/Pizza';
import ShoppingCart from './componenets/ShoppingCart';
import UserContext from './utils/context'
import Pass from './componenets/Pass';
import Finish1 from './componenets/Finish1';
import Finish2 from './componenets/Finish2';
import Sent from './componenets/Sent';
import Pay from './componenets/Pay';



function App() {
 
  const [user, setUser] = useState({})


  return (
    // <UserContext.Provider value={user}>
      <div className="App">
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/branches' element={<Branches />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/pizza' element={<Pizza />} />
            <Route path='/shoppingcart' element={<ShoppingCart />} />
            <Route path='/goto/:path' element={<Pass />} />
            <Route path='/finish1' element={<Finish1 />} />
            <Route path='/pay' element={<Pay />} />
            <Route path='/finish2' element={<Finish2 />} />
            <Route path='/sent' element={<Sent />} />

          </Routes>
        </Router>
      </div>
    // </UserContext.Provider>
  );
}

export default App;
