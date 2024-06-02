import React from "react";
import "../Style/Order.css";

function Order({ id, onClick }) {
    return (
        <div className="order" onClick={() => onClick(id)}>
            <p>Order {id}</p>
            <button>Select</button>
        </div>
    );
}

export default Order;
