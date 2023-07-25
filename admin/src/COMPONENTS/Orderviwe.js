import { toBeChecked } from "@testing-library/jest-dom/dist/matchers";
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Link } from 'react-router-dom'
import check from '../img/check.jfif'
import ok from '../img/ok.jpg'

function Orderview() {

    const [product, setproduct] = useState([])
    const [adding, setadding] = useState([])
    
    const [list, setlist] = useState(['start'])
   

    const state = []
    const navigate = useNavigate()
    const params = useParams()
    const nameandid = JSON.parse(params.data)
    console.log(nameandid);



    useEffect(() => {
        console.log(params)
        async function getadding() {
            fetch(`http://localhost:3600/orders/gettadingnamebyid/${nameandid.order_id}`)
                .then(res => res.json())
                .then(ans => {
                    console.log(ans)
                    let temp = JSON.parse(ans)
                    console.log(temp)
                    setadding(temp)
                })
        }
        async function getproducts() {
            fetch(`http://localhost:3600/orders/getproductsnamebyid/${nameandid.order_id}`)
                .then(res => res.json())
                .then(ans => {
                    console.log(ans)
                    let temp = JSON.parse(ans)
                    console.log(temp)
                    setproduct(temp)
                    
                    setlist(temp)
                })
        }
        getproducts()
        getadding()

    
    }, state)

    const taskClicked = (c)=>{
        console.log(c)
        console.log(list)
        let ans = list.find(element => element.name === c)
        console.log('ans: '+ans)
        if (ans) {
            let t = list
            console.log(t)
            t.splice(ans,1)
            console.log(t)
            setlist(t)
            if(list[0]=== undefined){
                console.log('empty')
                fetch(`http://localhost:3600/orders/changesendbyorderid/${nameandid.order_id}`)
                .then(res=>res.json())
                .then(ans=>{
                    console.log(ans)
                    navigate('/sent')
                })
                
            }
        }
        else{
            if(list[0]=== undefined){
                console.log('empty')
                navigate('')
            }
        }
    }

    return (
        <div className="orderview">
            <h2 className="hov">{nameandid.name}</h2>
            <h2 className="hov">{nameandid.comment}</h2>
            <div className="productsov">
                <div>
                    {product.map((c, i) => {
                        if (c) {
                            console.log('product ' + c);
                            return (
                                <div key={i} className="ovpa myButton">
                                    <button className="buttonov" onClick={()=>{taskClicked(c.name)}}><img src={ok} className="imgov" width='40px' /></button>
                                    <p className="hov">{c.name}</p>
                                </div>)
                        }

                    })}

                </div>
                <div className="addingov">
                    {adding.map((c, i) => {
                        if (c) {
                            
                            console.log('product ' + c);

                            return (
                                <div key={i} className="ovpa">
                                    <p className="hov myButton">{c.name}</p>
                                </div>)
                        }

                    })}

                </div>
            </div>

        </div>
    )
}
export default Orderview