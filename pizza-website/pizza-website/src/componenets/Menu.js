import React, { useEffect, useState, useContext, createContext } from "react";
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import Header from "./Header";
import ProductView from "./ProductView";
import back from '../img/back.png';
import pizza from '../img/pizza3.jfif'
import "../CSS/Menu.css"

const ShoppingCartContext = createContext({
    cart: [],
    setShoopingCart: () => { }
})

function Menu() {
    const [productList, setProductList] = useState([])
    const [cart, setShoopingCart] = useState([])
    const state = []

    useEffect(() => {
        async function getallproduct() {
            fetch(`http://localhost:3600/menue/getAllProduct`)
                .then(res => res.json())
                .then(ans => {
                    console.log(ans)
                    let temp = JSON.parse(ans)
                    console.log(temp)
                    if(ans)
                        setProductList(temp)
                })
        }
        getallproduct()
    }, state)
    return (
        // <ShoppingCartContext.Provider>
        <div id="MainDiv">
            <Header />
            <div className="menuContainer">
                <Link to="/"><img src={back} className="backicon" /></Link>
                <div className="menudiv">
                    <div className="linkdiv productdiv">
                        <h1>DO YOUR PIZZA</h1>
                        <Link to="/pizza"><img src={pizza} className="pizzaimg" /></Link>
                    </div>
                    {productList.map((a, i) => {
                        console.log(a)
                        if (a.enable === 1) {
                            return (
                                <ProductView data={JSON.stringify(a)} key={i} />
                            )
                        }
                        else {
                            return;
                        }
                    })}
                </div>
            </div>
        </div>


        // </ShoppingCartContext.Provider>
    )
}
export default Menu;