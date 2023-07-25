import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import branch from '../img/branch.png'
import shoping from '../img/shoping.jfif'
import login from '../img/login.jpg'
import logo from '../img/logo.jpg'


function Header() {
    return (
        <div className="headerdiv">
            <Link to='/'><img src={logo} className="shoplogo" alt="home" /></Link>
            <div>
                <Link to='/branches'><img src={branch} className="headerimg" alt="branches list" /></Link>
                <Link to='/shoppingcart'><img src={shoping} className="headerimg" alt="your bag" /></Link>
                
            </div>
        </div>
    )
}
export default Header;