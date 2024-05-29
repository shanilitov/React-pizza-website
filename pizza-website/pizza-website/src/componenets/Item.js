import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';

import deleteicon from '../img/delete.jpg';

function Item({ data, addings }) {

    const temp = data;
    const navigate = useNavigate();
    // console.log(`in item, data is:${temp} addings are: ${JSON.stringify(addings)}`)

    const deleteClick = () => {
        let list = JSON.parse(localStorage.getItem('shopping_cart'));
        const updatedList = list.filter(item => {
            console.log(item.key)
            return item.key !== temp.product.id
        });
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
                {addings.map((a) => {
                    <label>{JSON.parse(a.product).name}</label>
                })}
            </div>
            <button onClick={() => deleteClick} className="myButton"><img src={deleteicon} className="deleteicon" /></button>
        </div>
    )

}

export default Item;
