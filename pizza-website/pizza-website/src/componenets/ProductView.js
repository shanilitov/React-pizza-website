import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import ok from '../img/ok.jpg'

function ProductView(data) {
    const [showModal, setShowModal] = useState(false);
    const [cartQuantity, setCartQuantity] = useState(0);
    const [quantityToAdd, setQuantityToAdd] = useState(1); // סטייט עבור הכמות להוספה לעגלה
    let temp = JSON.parse(data.data);

    useEffect(() => {
        let cart = JSON.parse(localStorage.getItem('shopping_cart'));
        if (cart) {
            let quantity = cart.reduce((total, item) => {
                if (item.id === temp.id) {
                    return total + 1;
                }
                return total;
            }, 0);
            setCartQuantity(quantity);
        } else {
            setCartQuantity(0);
        }
    }, []);

    const okClick = () => {
        setShowModal(false);
        let cart = JSON.parse(localStorage.getItem('shopping_cart'));
        if (cart) {
            localStorage.removeItem('shopping_cart');
            for (let i = 0; i < quantityToAdd; i++) {
                cart.push(temp);
            }
            localStorage.setItem('shopping_cart', JSON.stringify(cart));
        } else {
            let product = [];
            for (let i = 0; i < quantityToAdd; i++) {
                product.push(temp);
            }
            localStorage.setItem('shopping_cart', JSON.stringify(product));
        }
        setCartQuantity(cartQuantity + quantityToAdd);
        setQuantityToAdd(1); // לאפס את הכמות להוספה
    };

    return (
        <div className="productdiv">
            <div className="producttext">
                <h1>{temp.name}</h1>
                <h1>{temp.price + '$'}</h1>
                <p>Quantity in Cart: {cartQuantity}</p>
            </div>
            <button onClick={() => setShowModal(true)}><img src={ok} className="icon" /></button>

            {/* Modal */}
            {showModal &&
                <div className="modal">
                    <div className="modal-content">
                        <h2>{temp.name}</h2>
                        <p>{temp.description}</p>
                        <input
                            type="number"
                            value={quantityToAdd}
                            min="1"
                            max="10"
                            onChange={(e) => setQuantityToAdd(parseInt(e.target.value))}
                        />
                        <button onClick={okClick}>Add to Cart</button>
                        <button onClick={() => setShowModal(false)}>Close</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default ProductView;
