import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';

function Adding(data){
    let temp = JSON.parse(data.data)
    console.log(temp)
    return(
        <div>
            <p>{temp.name}</p>
            <input type="checkbox"/>
        </div>
    )
}
export default Adding;