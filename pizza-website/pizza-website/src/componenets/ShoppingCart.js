import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import Header from "./Header";
import Item from "./Item";
import finish2 from '../img/finish2.jfif'
import back from '../img/back.png'

function ShoppingCart() {
    const [finleprice, setprice] = useState(0)
    const [list, setList] = useState([])
    const state = [];
    useEffect(() => {
        // localStorage.clear()
        let getlist = JSON.parse(localStorage.getItem('shopping_cart'))
        console.log(getlist)
        setList(getlist)
        let sum = 0
        getlist.map((data, i) => {
            
            let t = JSON.stringify(data)
            console.log(JSON.parse(t))
            console.log('t'+t)
            let v = JSON.parse(t)
            console.log('t'+v.price)
            sum = sum + v.price;
            return true;
        })
        setprice(sum)

    }, state)
    return (
        <div>
            <Header />
            <div id="shoppingcart">
                <div className="shoppingcart">
                    <div >
                        {
                            list.map((data, i) => {
                                if (data) {
                                    console.log(data)
                                    return (
                                        <Item data={JSON.stringify(data)} key={i} />
                                    )
                                }
                                else {
                                    return (
                                        <h1>YOUR SHOPPING CART IS EMPTY</h1>
                                    )
                                }
                            })
                        }
                    </div>
                    <div className="linkdiv">
                        <Link to="/"><img src={back} className="backicon" width='100px' /></Link>
                        <div>
                            <h1>{finleprice + '$'}</h1>
                        </div>
                        <Link to="/finish1" ><img src={finish2} className="myButton" width='100px' /></Link>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default ShoppingCart;