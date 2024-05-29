import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import Header from "./Header";
import Item from "./Item";
import finish2 from '../img/finish2.jfif'
import back from '../img/back.png'
import '../CSS/ShopingCart.css'

function ShoppingCart() {
    const [finleprice, setprice] = useState(0);
    const [products, setProducts] = useState([]);
    const [addings, setAddings] = useState([]);

    useEffect(() => {
        let getlist = JSON.parse(localStorage.getItem('shopping_cart'));
        console.log(getlist);

        if (getlist) {
            let tempProducts = [];
            let tempAddings = [];
            let sum = 0;

            getlist.forEach((data) => {
                if (data.key === -1) {
                    console.log(`Adding to addings: ${JSON.stringify(data)}`);
                    tempAddings.push(data);
                } else {
                    console.log(`Adding to products: ${JSON.stringify(data)}`);
                    tempProducts.push(data);
                }

                sum += data.product.price * data.quantity;
            });

            setAddings(tempAddings);
            setProducts(tempProducts);
            setprice(sum);
        } else {
            setprice(0);
        }
    }, []);


    return (
        <div className="shoppingCartContainer">
            <Header />
            <div id="shoppingcart">
                <div className="shoppingcart">
                    <div>
                        {products.length > 0 ?
                            products.map((data, i) => (
                                <Item data={data} addings={addings.filter(a => JSON.parse(a.product).product_id === data.key)} key={i} />
                            )) :
                            <h1>YOUR SHOPPING CART IS EMPTY</h1>
                        }
                    </div>
                    <div className="linkdiv">
                        <Link to="/"><img src={back} className="backicon" width='150px' /></Link>
                        <div>
                            <h1>{finleprice + '$'}</h1>
                        </div>
                        {finleprice === 0 ? null :
                            <Link to="/finish1"><img src={finish2} className="myButton" width='100px' /></Link>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShoppingCart;
