import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';

import deleteicon from '../img/delete.jpg';

function Item(data) {
    let temp = JSON.parse(data.data);
    const navigate = useNavigate();

    const deleteClick = () => {
        let list = JSON.parse(localStorage.getItem('shopping_cart'));
        const updatedList = list.filter(item => {
            console.log(item.key)
            return item.key !== temp.product.id});
        localStorage.setItem('shopping_cart', JSON.stringify(updatedList));
        const path = 'shoppingcart';
        navigate(`/goto/${path}`);
    }

    return (
        <div className="item">
            <div className="textdiv">
                <h1>{temp.product.name}</h1>
                <p>{temp.product.price + '$'}</p>
                <p>Quantity: {temp.quantity}</p> {/* תצוגת הכמות של הפריט בעגלה */}
            </div>
            <button onClick={deleteClick} className="myButton"><img src={deleteicon} className="deleteicon" /></button>
        </div>
    )
}

export default Item;
