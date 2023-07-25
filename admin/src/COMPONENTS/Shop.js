import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import Order from "./Order";
import OrderView from "./OrderView";


function Shop() {
    const [orders, setOrder] = useState([])
    const [sent, setSent] = useState([])
    const [branchDetails, setBranchDetails] = useState({})
    const [effect, seteffect] = useState([])
    const state = []

    //params = branch id, user name
    const params = useParams()
    const ID = params.branchid

    let orderview = 'no orders'


    useEffect(() => {
        async function orderFetch() {
            console.log('branch id: ' + params.branchid)
            fetch(`http://localhost:3600/branches/get_all_orders/${ID}`)
                .then(res => res.json())
                .then(ans => {
                    console.log(ans)
                    let temp = JSON.parse(ans)
                    console.log(temp)

                    let l = []
                    temp.map((a, i) => {
                        
                        l.push(a.order_id)
                        
                    })
                    setOrder(l)
                })
        }
        async function userFetch() {
            fetch(`http://localhost:3600/branches/getBranchData/${ID}`)
                .then(res => res.json())
                .then(ans => {
                    console.log(ans)
                    //[{"id":4,"city":"jerusalem","street":"balfur","number":10,"name":"jrslm-balfur"}]
                    //ans = {branch name, {adress}, brach id}
                    let temp = JSON.parse(ans)
                    console.log(temp)
                    temp = temp[0]
                    console.log(temp)

                    setBranchDetails({
                        'branchName': temp.name,
                        'street': temp.street,
                        'number': temp.number,
                        'city': temp.city,
                        'branchId': temp.id
                    });
                })
        }

        localStorage.setItem('params', JSON.stringify(params))
        orderFetch()
        userFetch()
    }, state)

    const choicenorder = (a) => {
        fetch(`http://localhost:3600/orders/get_order_data/${a}`)

    }

    return (
        <div>
            {/* the branch and the worker */}

            <div className="branchInfo">
                <p className="branchInfo">BRANCH NAME:</p>
                <p className="branchInfo">{branchDetails.branchName}</p>
                <p className="branchInfo">ADRESS:</p>
                <p className="branchInfo">{branchDetails.street}</p>
                <p className="branchInfo">{branchDetails.number}</p>
                <p className="branchInfo">,</p>
                <p className="branchInfo">{branchDetails.city}</p>
                <p className="branchInfo">WORKER:</p>
                <p className="branchInfo">{params.username}</p>


            </div>
            {orders.map((c, i) => {
                if (c) {
                    console.log('order ' + c);
                    return (
                        <Order id={c} key={i}/>)
                }

            })}

        </div>
    )
}

export default Shop