import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import Header from "./Header";
import menu from '../img/pic_for_menu.jpeg'
import pizza from '../img/pizza3.jfif'
import track from '../img/finish2.jfif'
import '../CSS/Home.css'

function Home() {

    return (
        <div id="homecontainer">
            <Header />
            <div id="home" className="Homecontainer">
                {/* <Link to='/RegistrationComponent'className="homelink" >
                    <div className="homediv">
                    <p className="homep">Track Your orders</p>
                        <img src={track} className="homeimg" id="loginicon" />
                    </div>
                </Link> */}
                
                <div>
                    <div className="Homecontent">
                        <h1 >Welcome to Online Pizza</h1>
                        <h2 style={{color: 'red'}}>It's pizza Time</h2>
                    </div>
                    <Link to='/pizza' className="homelink">
                    <div className="homediv">
                        <p className="homep">DO YOUR PIZZA</p>
                        <img src={pizza} className="homeimg" />
                    </div>
                </Link>
                </div>
                
                <Link to='/menu' className="homelink">
                    <div className="homediv">
                        <p className="homep">Menu</p>
                        <img src={menu} className="homeimg" id="menuicon" />
                    </div>
                </Link>
            </div>

        </div>
    )
}
export default Home;