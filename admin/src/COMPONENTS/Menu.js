import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Product from "./Product";
import add from "../img/add.jpg";
import home from '../img/home.jpg';

function Menu() {
    const [productList, setProductList] = useState([]);
    const [addingList, setAddingList] = useState([]);

    useEffect(() => {
        async function menueFetch() {
            const productsResponse = await fetch('http://localhost:3600/menue/getAllProduct');
            const productsData = await productsResponse.json();
            const products = JSON.parse(productsData);

           // const addingsResponse = await fetch('http://localhost:3600/menue/getAllAdding');
            //const addingsData = await addingsResponse.json();

            setProductList(products);
         //   setAddingList(addingsData);
        }

        menueFetch();
    }, []);

    const handleDeleteProduct = async (productId) => {
        await fetch(`http://localhost:3600/menue/delete/${productId}`, { method: 'DELETE' });
        setProductList(prevProductList => prevProductList.filter(product => product.id !== productId));
    };

    let message = 'add';
    let linkurl = `/productview/${message}`;

    return (
        <div className="menue">
            {productList.map((product, i) => (
                <Product key={product.id} data={product} onDelete={handleDeleteProduct} />
            ))}
            <div id="adddiv">
                <Link to={linkurl}><img src={add} className="editimg" /></Link>
                <Link to='/admin'><img src={home} className="editimg" /></Link>
            </div>
        </div>
    );
}

export default Menu;
