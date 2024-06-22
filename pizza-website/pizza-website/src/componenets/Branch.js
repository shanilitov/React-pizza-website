import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import branch from '../img/branch.png'

function Branch(data) {
    console.log(data)
    let temp = JSON.parse(data.data)
    return (
        <div className="branch">
            <img src={branch} className="branchimg"/>
            <div className="branchdiv">
                <h1 className="branchtext">{temp.name}</h1>
                <p className="branchtext">{temp.street + ' street number ' + temp.number + ', ' + temp.city}</p>

            </div>
        </div>
    )
}
export default Branch;