import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Style/OrderView.css";

function OrderView({ order_id, isTakeAway, status, done, comment, addings }) {
    const [products, setProducts] = useState([]);
    const [allProductsReady, setAllProductsReady] = useState(false);
    const [isReady, setIsReady] = useState(status)
    const [Comment, setComment] = useState(comment)
    const [Addings, setAddings] = useState('')
    const b_text = ['DONE?', 'Delivered?']
    const params = useParams();


    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch(`http://localhost:3600/orders/getproductsnamebyid/${order_id}`);
                const data = await response.json();
                const productsArray = Array.isArray(data) ? data : JSON.parse(data);
                setProducts(productsArray.map(product => ({ ...product, ready: product.ready })));
            } catch (error) {
                console.error("Error fetching products:", error);
                setProducts([]); // Set products to an empty array in case of an error
            }
        }
        setComment(comment)
        setAddings(addings)
        fetchProducts();
    }, [order_id, comment]);

    useEffect(() => {
        setAllProductsReady(products.length > 0 && products.every(product => product.ready));
    }, [products]);

    const handleProductClick = async (productName, productId) => {
        try {
            // Update product status in the backend (assuming there's an endpoint for this)
            await fetch(`http://localhost:3600/orders/change_product_in_order_status/${order_id}/${productId}`, {
                method: 'GET',
            });

            // Update product status in the frontend
            setProducts(products.map(product =>
                product.id === productId ? { ...product, ready: true } : product
            ));
        } catch (error) {
            console.error("Error updating product status:", error);
        }
    };

    const sendMessage = async (message, connection) => {
        try {
            // Mark the order as delivered in the backend (assuming there's an endpoint for this)
            await fetch(`http://localhost:3600/chat/send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message, //`Order Number ${order_id} is ready and waiting to be picked up`,
                    orderId: order_id,
                    connection: connection
                })
            });
        } catch (error) {
            console.error("Error marking order as delivered:", error);
        }
    }

    const handleDeliveryClick = async () => {
        console.log(`status is: ${status}`)
        if (status == 0) {
            try {
                const response = await fetch(`http://localhost:3600/orders/changesendbyorderid/${order_id}/1`, {
                    method: 'GET',
                });
                if (response) {
                    done()
                    console.log(response)
                    setIsReady(true)
                    // Send messages to the client and the deliver
                    sendMessage(`Your order Number ${order_id} is ready and waiting to be picked up`, 'SC')
                    if (isTakeAway == null)
                        sendMessage(`Order Number ${order_id} is ready and waiting for you to pick it up`, 'SD')
                }
            } catch (error) {
                console.error("Error marking order as delivered:", error);
            }
        }
        // if (isReady) {
        //     try {
        //         // Mark the order as delivered in the backend (assuming there's an endpoint for this)
        //         const response = await fetch(`http://localhost:3600/orders/changesendbyorderid/${order_id}/2`, {
        //             method: 'GET',
        //         });
        //         if (response)
        //             done()

        //     } catch (error) {
        //         console.error("Error marking order as delivered:", error);
        //     }
        // }
        // else {
        //     try {
        //         const response = await fetch(`http://localhost:3600/orders/changesendbyorderid/${order_id}/1`, {
        //             method: 'GET',
        //         });
        //         if (response) {
        //             setIsReady(true)
        //             // Send messages to the client and the deliver
        //             sendMessage(`Your order Number ${order_id} is ready and waiting to be picked up`, 'SC')
        //             if (isTakeAway == null)
        //                 sendMessage(`Order Number ${order_id} is ready and waiting for you to pick it up`, 'SD')
        //         }
        //     } catch (error) {
        //         console.error("Error marking order as delivered:", error);
        //     }

        // }


    };


    return (
        <div className="order-view">
            <h2>Order Number {order_id} Details</h2>
            <p className="comment">{Comment}</p>
            <div className="product-list">
                {products.length > 0 ? (
                    products.map((product, index) => (
                        <div>
                            <div key={index} className="product-item">
                                <span>{product.amount}</span>
                                <span>{product.name}</span>
                                {product.ready ? (
                                    <span className="ready-icon">✔️</span>
                                ) : (
                                    <button onClick={() => handleProductClick(product.name, product.id)}>
                                        Mark as Ready
                                    </button>
                                )}

                            </div>
                            {product.id == 1 && Addings != '' ?
                                <p className="comment">Addings: {Addings}</p> : ''
                            }
                        </div>
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>
            {allProductsReady && (
                <div>
                    <button className="delivery-button" onClick={handleDeliveryClick}>
                        All Done{isReady ? '✔️' : '?'}
                    </button>

                </div>
            )}
        </div>
    );
}

export default OrderView;











// import React, { useState, useEffect } from "react";
// import { Navigate, useNavigate, useParams } from "react-router-dom";
// import { Link } from 'react-router-dom'
// import Complete from "./Complete";

// function OrderView() {

//     const [list, setList] = useState([])
//     const [doneList, setDoneList] = useState([])
//     //params = {user id, user name, branch id, [{order data}]}
//     const params = useParams()
//     JSON.parse(params)


//     useEffect(() => {
//         setList(params.orderdata)
//     }, [params.orderdata])

//     const homeClick = () => {
//         //return to shop
//         const name = params.username
//         const id = params.branchid
//         Navigate(`/shop/${name}/${id}`)
//     }
//     const taskClick = (a) => {
//         let current = doneList
//         current.push(a)
//         setDoneList(current)
//         current = list
//         current.forEach((data, index) => {
//             if (data === a) {
//                 current.splice(index, 1)
//             }
//         })
//         setList(current)

//         if (list === []) {
//             Navigate(`/complete/${params.shopdata}`)
//         }
//     }

//     return (
//         <div>
//             {/* link back to shop*/}
//             <img src='../img/home' onClick={homeClick()} />
//             {/* list of order details with a checkbox */}
//             {list.forEach(a => {
//                 <div>
//                     <h1>{a.name}</h1>
//                     <h1>{a.details}</h1>
//                     <input type='button' onClick={taskClick(a)} className="myButton">DONE</input>
//                 </div>
//             })}
//             {/* if all checkbox are true: display odrer is ready for 20 seconds and then back to shop  */}

//         </div>
//     )
// }
// export default OrderView;