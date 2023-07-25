import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import ok from '../img/ok.jpg'

function ProductView(data) {
    console.log(data)
    let temp = JSON.parse(data.data)

    const okClick = ()=>{
        //store this product in the shopping cart in the local storege
        let cart = JSON.parse(localStorage.getItem('shopping_cart'))
        if (cart) {
            console.log(cart)
            localStorage.removeItem('shopping_cart')
            cart.push(temp)
            localStorage.setItem('shopping_cart', JSON.stringify(cart))
            
        }
        else{
            let product = [temp]
            localStorage.setItem('shopping_cart', JSON.stringify(product))            
        }
    }
    return (
        <div className="productdiv">
            <div className="producttext">
                <h1>{temp.name}</h1>
                <h1>{temp.price + '$'}</h1>
            </div>
            <button onClick={()=>{okClick()}}><img src={ok} className="icon" /></button>

        </div>
    )
}
export default ProductView;