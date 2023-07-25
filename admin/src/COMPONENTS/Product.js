import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import edit from '../img/edit.jpg';
import deleteicon from '../img/delete.jpg'

function Product(data) {
    const thisurl = `/productview/${JSON.stringify(data.data)}`
    console.log('in product')
    console.log(data)
    const navigate = useNavigate()

    let name;
    if (data !== undefined)
        name = data.data.name;

    console.log(data.data)

    async function deleteClick(){
        fetch(`http://localhost:3600/menue/delete/${data.data.id}`)
        .then(
            navigate('/admin')
        )
    }

    return (
        <div className="product">
            <h1 id="productName">{name}</h1>
            <Link to={thisurl}><img src={edit} className="editimg" /></Link>
            <button onClick={()=>{deleteClick()}}><img src={deleteicon} className="editimg" /></button>
        </div>
    )
}
export default Product;