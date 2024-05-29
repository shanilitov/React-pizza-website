import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import edit from '../img/edit.jpg';
import deleteicon from '../img/delete.jpg';

function Product({ data, onDelete }) {
    const thisurl = `/productview/${JSON.stringify(data)}`;
    const navigate = useNavigate();

    let name;
    if (data !== undefined)
        name = data.name;

    const deleteClick = async () => {
        await onDelete(data.id);
    };

    return (
        <div className="product">
            <h1 id="productName">{name}</h1>
            <Link to={thisurl}><img src={edit} className="editimg" /></Link>
            <button onClick={deleteClick}><img src={deleteicon} className="editimg" /></button>
        </div>
    );
}

export default Product;
