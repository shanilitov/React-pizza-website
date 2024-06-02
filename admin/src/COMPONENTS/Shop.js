import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Order from "./Order";
import OrderView from "./OrderView";
import Chat from "./Chat";
import "../Style/Shop.css";

function Shop() {
    const [orders, setOrders] = useState([]);
    const [branchDetails, setBranchDetails] = useState({});
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [update, setUpdate] = useState(0)
    const params = useParams();
    const ID = params.branchid;

    useEffect(() => {
        async function fetchOrders() {
            console.log('branch id: ' + params.branchid);
            fetch(`http://localhost:3600/branches/get_all_orders/${ID}`)
                .then(res => res.json())
                .then(ans => {
                    console.log(ans);
                    setOrders(JSON.parse(ans));
                });
        }
        async function fetchBranchDetails() {
            fetch(`http://localhost:3600/branches/getBranchData/${ID}`)
                .then(res => res.json())
                .then(ans => {
                    console.log(ans);
                    const branch = JSON.parse(ans)[0];
                    setBranchDetails(branch);
                });
        }
        fetchOrders();
        fetchBranchDetails();
    }, [ID, params.branchid, update]);

    const handleOrderClick = (orderId) => {
        setSelectedOrder(orderId);
    };

    const handleSendClicked = () =>{
        // כאן אני רוצה לשים את הפקודה שתוריד מorders את ההזמנה.
        setSelectedOrder(null)
        setUpdate(update+ 1)
    }

    return (
        <div className="shop-container">
            <header className="shop-header">
                <div>
                    <h1>{branchDetails.name}</h1>
                    <p>{params.username}</p>
                </div>
                <button className="logout">Logout</button>
            </header>
            <div className="content-container">
                <div className="orders-section">
                    {orders.map((order, index) => (
                        <Order key={index} id={order.order_id} onClick={handleOrderClick} isTakeAway={order.IstakeAway} />
                    ))}
                </div>
                <div className="order-details-section">
                    {selectedOrder ? <OrderView order_id={selectedOrder} status={selectedOrder.status} done={handleSendClicked}/> : <p>Please select an order.</p>}
                </div>
                <div className="chat-section">
                    {selectedOrder ? <Chat order_id={selectedOrder} /> : <p>Please select an order.</p>}
                </div>
            </div>
        </div>
    );
}

export default Shop;























// import React, { useEffect, useState } from "react";
// import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';
// import Order from "./Order";
// import OrderView from "./OrderView";


// function Shop() {
//     const [orders, setOrder] = useState([])
//     const [sent, setSent] = useState([])
//     const [branchDetails, setBranchDetails] = useState({})
//     const [effect, seteffect] = useState([])
//     const state = []

//     //params = branch id, user name
//     const params = useParams()
//     const ID = params.branchid

//     let orderview = 'no orders'


//     useEffect(() => {
//         async function orderFetch() {
//             console.log('branch id: ' + params.branchid)
//             fetch(`http://localhost:3600/branches/get_all_orders/${ID}`)
//                 .then(res => res.json())
//                 .then(ans => {
//                     console.log(ans)
//                     let temp = JSON.parse(ans)
//                     console.log(temp)

//                     let l = []
//                     temp.map((a, i) => {
                        
//                         l.push(a.order_id)
                        
//                     })
//                     setOrder(l)
//                 })
//         }
//         async function userFetch() {
//             fetch(`http://localhost:3600/branches/getBranchData/${ID}`)
//                 .then(res => res.json())
//                 .then(ans => {
//                     console.log(ans)
//                     //[{"id":4,"city":"jerusalem","street":"balfur","number":10,"name":"jrslm-balfur"}]
//                     //ans = {branch name, {adress}, brach id}
//                     let temp = JSON.parse(ans)
//                     console.log(temp)
//                     temp = temp[0]
//                     console.log(temp)

//                     setBranchDetails({
//                         'branchName': temp.name,
//                         'street': temp.street,
//                         'number': temp.number,
//                         'city': temp.city,
//                         'branchId': temp.id
//                     });
//                 })
//         }

//         localStorage.setItem('params', JSON.stringify(params))
//         orderFetch()
//         userFetch()
//     }, state)

//     const choicenorder = (a) => {
//         fetch(`http://localhost:3600/orders/get_order_data/${a}`)

//     }

//     return (
//         <div>
//             {/* the branch and the worker */}

//             <div className="branchInfo">
//                 <p className="branchInfo">BRANCH NAME:</p>
//                 <p className="branchInfo">{branchDetails.branchName}</p>
//                 <p className="branchInfo">ADRESS:</p>
//                 <p className="branchInfo">{branchDetails.street}</p>
//                 <p className="branchInfo">{branchDetails.number}</p>
//                 <p className="branchInfo">,</p>
//                 <p className="branchInfo">{branchDetails.city}</p>
//                 <p className="branchInfo">WORKER:</p>
//                 <p className="branchInfo">{params.username}</p>


//             </div>
//             {orders.map((c, i) => {
//                 if (c) {
//                     console.log('order ' + c);
//                     return (
//                         <Order id={c} key={i}/>)
//                 }

//             })}

//         </div>
//     )
// }

// export default Shop