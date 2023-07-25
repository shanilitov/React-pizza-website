import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import logo from '../img/logo.jpg'

function Sent(){
    return(
        <div className="sent" >
            <Link to='/' > <img src={logo} className='myButton' width='50%'/></Link>
        </div>
    )
}
export default Sent;