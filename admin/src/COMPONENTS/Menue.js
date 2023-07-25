import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import Product from "./Product";
import add from "../img/add.jpg";
import home from '../img/home.jpg';

function Menue() {
    //display of the menue
    //1.fetch the menue
    //2. display the [pruduct nane][edit button]
    //display [add product] button
    //display [back home] button
    //3. when edit/add click->display product detail component
    const [productList, setProductList] = useState([])//[{}]
    const [addingList, setAddingList] = useState([])//[{}]
    const x = []

    useEffect(() => {
        async function menueFetch() {
            fetch('http://localhost:3600/menue/getAllProduct')
                .then(
                    ans => ans.json()
                )
                //ans = [{id, name, price, eneble, adding?true/false}]
                .then(ans => {
                    console.log(ans)
                    let temp = JSON.parse(ans)
                    console.log(temp)
                    setProductList(temp)
                })
            fetch('http://localhost:3600/menue/getAllAdding')
                .then(
                    ans => ans.json()
                )
                //ans = [{id, name, price, eneble, adding?true/false}]
                .then(ans => {
                    setAddingList(ans)
                })

        }
        menueFetch()
    }, x)
    let message = 'add'
    let linkurl = `/productview/${message}`

    return (
        <div className="menue">

            {productList.map((a, i) => {
                console.log('prodact');
                return (
                    <Product data={a} />)
            })}

            <div id="adddiv">
                <Link to={linkurl}><img src={add} className="editimg" /></Link>
                <Link to='/admin'><img src={home} className="editimg" /></Link>
            </div>
            {/*
            {addingList.forEach((a, i) => {
                <Product data={a} />
            })} */}
            {/* <Product data={productList[0]}/> */}


        </div>)
}
export default Menue;