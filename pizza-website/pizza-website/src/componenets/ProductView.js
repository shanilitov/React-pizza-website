import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import ok from '../img/ok.jpg'

function ProductView(data) {
    const [showModal, setShowModal] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [quantityToAdd, setQuantityToAdd] = useState(1); // סטייט עבור הכמות להוספה לעגלה
    let temp = JSON.parse(data.data);

    useEffect(() => {
        let cart = JSON.parse(localStorage.getItem('shopping_cart')) || [];
        setCartItems(cart);
    }, []);

    const okClick = (quantity) => {
        setShowModal(false);
        let cart = JSON.parse(localStorage.getItem('shopping_cart')) || [];

        console.log(`in onCkick: temp= ${JSON.stringify(temp)} cart: ${cart} tempId: ${temp.id}`)
        // בדיקה האם המוצר כבר קיים בעגלה
        const existingProductIndex = cart.findIndex(item =>{ 
            console.log(JSON.stringify(item))
            return JSON.parse( JSON.stringify(item)).key === temp.id});

        if (existingProductIndex !== -1) {
            // אם המוצר כבר קיים, עדכון הכמות שלו
            cart[existingProductIndex].quantity = quantity;
        } else {
            // אם המוצר לא קיים, הוספתו לעגלה עם הכמות המבוקשת
            cart.push({ key: temp.id, product: temp, quantity: quantity });
        }

        localStorage.setItem('shopping_cart', JSON.stringify(cart));
        setCartItems(cart);
        setQuantityToAdd(1); // לאפס את הכמות להוספה
    };

    return (
        <div className="productdiv">
            <div className="producttext">
                <h1>{temp.name}</h1>
                <h1>{temp.price + '$'}</h1>
                <p className="redText">Quantity in Cart: {cartItems.find(item => item.key === temp.id)?.quantity || 0}</p>
            </div>
            <button className="productAddButton" onClick={() => setShowModal(true)}><img src={ok} className="icon" /></button>

            {/* Modal */}
            {showModal &&
                <div className="modal">
                    <div className="modal-content">
                        <h2 className="redText">{temp.name}</h2>
                        <p className="redText">{temp.description}</p>
                        <input
                            type="number"
                            value={quantityToAdd}
                            min="1"
                            max="10"
                            onChange={(e) => setQuantityToAdd(parseInt(e.target.value))}
                        />
                        <button className="productAddButton" onClick={() => okClick(quantityToAdd)}>Add to Cart</button>
                        <button className="productAddButton" onClick={() => setShowModal(false)}>Close</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default ProductView;
