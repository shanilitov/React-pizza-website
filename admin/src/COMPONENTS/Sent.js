import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import check from '../img/check.jfif'

function Sent() {
    const params = JSON.parse(localStorage.getItem('params'))
    console.log(params)

    let path = `/shop/${params.username}/${params.branchid}`

    return (
        <div>
            <Navigate to={path}/>
        </div>
    )
}
export default Sent
