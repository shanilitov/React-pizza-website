import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from 'react-router-dom'

function Order(id) {

    const [name, setname] = useState('')
    const [myData, setData] = useState()
    const state = []

    const navigate = useNavigate()

    useEffect(() => {
        console.log('in order ' + id.id)
        
        async function getOrderData() {
            console.log('fetch order id')
            fetch(`http://localhost:3600/orders/get_order_data/${id.id}`)
                .then(result => result.json())
                .then(res => {
                    console.log(res)
                    let data = JSON.parse(res)
                    console.log( data[0])
                    setData(data[0]) 
                    console.log('name:'+data[0].name)
                    setname(data[0].name)
                }

                )
        }
        getOrderData()

    }, state)

    const buttonclick = ()=>{
        let data = {
            'name':name,
            'order_id': myData.id,
            'comment': myData.comment
        }

        navigate(`/orderview/${JSON.stringify(data)}`)
    }

    return (
        <div className="order ">
            
            <button onClick={()=>{buttonclick()}} className='buttoninorder myButton'>{name}</button>
        </div>
    )
}
export default Order