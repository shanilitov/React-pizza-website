import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import Header from "./Header";

function Pass(){
    const params = useParams()
    console.log(params)
    const navigate = useNavigate()
    
    useEffect(()=>{
        navigate(`/${params.path}`)
    })
    return(
        <div>
            
        </div>
    )
}
export default Pass;