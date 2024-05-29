import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Outlet, useNavigate, Navigate } from 'react-router-dom';
import Login from './COMPONENTS/Login';
import Shop from './COMPONENTS/Shop'
import Admin from './COMPONENTS/Admin'
import Singin from './COMPONENTS/Signin';
import OrderView from './COMPONENTS/OrderView';
import Complete from './COMPONENTS/Complete';
import Menu from './COMPONENTS/Menu';
import logo from './img/logo.jpg'
import login from './img/login.jpg'
import ProductView from './COMPONENTS/ProductView';
import Orderview from './COMPONENTS/Orderviwe'
import Sent from './COMPONENTS/Sent';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} >
            <Route path="login" element={<Login />} ></Route>
            <Route path='shop/:username/:branchid' element={<Shop />}></Route>
            <Route path='signin' element={<Singin />}></Route>
            <Route path='orderview/:data' element={<Orderview />}></Route>
            <Route path='complete' element={<Complete />}></Route>
            <Route path='admin' element={<Admin />}></Route>
            <Route path='menu' element={<Menu />}></Route>
            <Route path='productview/:data' element={<ProductView />}></Route>
            <Route path='sent' element={<Sent />}></Route>

          </Route>
        </Routes>
      </Router>
    </div>
  );
}

function Home() {


  return (
    <div className='home'>
      <div className='logo'>
        <div id='logodiv'>
          <img src={logo} width='200px' alt=''></img>
        </div>
        <Link to='/login' className='loginimg'><img src={login} width='50px' height='50px' alt='' id='loginimg'></img></Link>
      </div>

      <Outlet />
      <br />
    </div>
  )
}

export default App;
