import React, { useEffect, useState } from 'react';
import '../CSS/OrderTrack.css'; // נניח שיש לך קובץ CSS לעיצובים
import {Link, useLocation, useNavigate } from 'react-router-dom';
import back from '../img/back.png';

const TrackOrder = () => {

    const location = useLocation();
    const { orders } = location.state;
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const navigate = useNavigate()

    const handleOrderClick = (orderId) => {
        setSelectedOrderId(selectedOrderId === orderId ? null : orderId);
    };


    const viewOrder = (order) => {
        console.log(order)
        navigate(`/order/${order.id}`)
    }

    console.log(orders)

    return (
        <div className="order-tracker">
            <Link to="/"><img src={back} className="backicon" /></Link>
            <h1>Track you orders</h1>
            <ul className="order-list">
                {orders.map(order => (
                    <li
                        key={order.id}
                        className={`order-item ${order.accept === 0 ? 'active-order' : 'inactive-order'}`}
                        onClick={() => handleOrderClick(order.id)}
                    >
                        <div className="order-summary">
                            <span>Order number: {order.id}</span>
                            <span>{order.order_date !== null ? new Date(order.order_date).toISOString().split('T')[0] : ''}</span>
                            <span>{order.status == 0 ? 'active' : 'old'}</span>
                        </div>
                        {selectedOrderId === order.id && (
                            <div>
                                <p>{order.street} {order.number}, {order.city}</p>
                                <button onClick={()=> viewOrder(order)}>Get into this order full details</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TrackOrder;
