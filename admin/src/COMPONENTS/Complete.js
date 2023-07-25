import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link , Navigate} from 'react-router-dom'

function Complete(){
    const params = useParams()
    JSON.parse(params)
    const name = params.username
    const id = params.branchid
    return(
        <div>
            <img src="..\img\sent.jpg"></img>
            <button onClick={()=>{Navigate(`/shop/${name}/${id}`)}} className="myButton">Home</button>
        </div>
    )
}
export default Complete;