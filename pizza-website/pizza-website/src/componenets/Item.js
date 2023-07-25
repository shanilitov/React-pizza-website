import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';

import deleteicon from '../img/delete.jpg';

function Item(data) {
    console.log('in item: ' + data)
    
    let temp = JSON.parse(data.data)
    
    console.log(temp)
    const navigate = useNavigate()

    const deleteClick = () => {
        let list = JSON.parse(localStorage.getItem('shopping_cart'))
        console.log(list)
        const index = list.find(a => a.id === temp.id)
        list.splice(index, 1)
        localStorage.removeItem('shopping_cart')
        localStorage.setItem('shopping_cart', JSON.stringify(list))
        const path = 'shoppingcart'
        navigate(`/goto/${path}`)
    }

    return (
        <div className="item">
            <div className="textdiv">
                <h1>{temp.name}</h1>
                <p>{temp.price + '$'}</p>
            </div>
            <button onClick={() => { deleteClick() }} className="myButton"><img src={deleteicon} className="deleteicon" /></button>
        </div>
    )
}
export default Item;