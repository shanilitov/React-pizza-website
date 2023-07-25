import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Link } from 'react-router-dom'
import Complete from "./Complete";

function OrderView() {

    const [list, setList] = useState([])
    const [doneList, setDoneList] = useState([])
    //params = {user id, user name, branch id, [{order data}]}
    const params = useParams()
    JSON.parse(params)


    useEffect(() => {
        setList(params.orderdata)
    }, [params.orderdata])

    const homeClick = () => {
        //return to shop
        const name = params.username
        const id = params.branchid
        Navigate(`/shop/${name}/${id}`)
    }
    const taskClick = (a) => {
        let current = doneList
        current.push(a)
        setDoneList(current)
        current = list
        current.forEach((data, index) => {
            if (data === a) {
                current.splice(index, 1)
            }
        })
        setList(current)

        if (list === []) {
            Navigate(`/complete/${params.shopdata}`)
        }
    }

    return (
        <div>
            {/* link back to shop*/}
            <img src='../img/home' onClick={homeClick()} />
            {/* list of order details with a checkbox */}
            {list.forEach(a => {
                <div>
                    <h1>{a.name}</h1>
                    <h1>{a.details}</h1>
                    <input type='button' onClick={taskClick(a)} className="myButton">DONE</input>
                </div>
            })}
            {/* if all checkbox are true: display odrer is ready for 20 seconds and then back to shop  */}

        </div>
    )
}
export default OrderView;