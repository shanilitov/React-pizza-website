import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import Header from "./Header";
import menu from '../img/menu.jfif'
import pizza from '../img/pizza3.jfif'

function Home() {

    return (
        <div>
            <Header />
            <div id="home">
                <Link to='/menu' className="homelink">
                    <div className="homediv">
                        
                        <img src={menu} className="homeimg"  id="menuicon"/>
                    </div>
                </Link>
                <Link to='/pizza' className="homelink">
                    <div className="homediv">
                        <p className="homep">DO YOUR PIZZA</p>
                        <img src={pizza} className="homeimg" />
                    </div>
                </Link>
            </div>

        </div>
    )
}
export default Home;