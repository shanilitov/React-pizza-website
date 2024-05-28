import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductsComponent from './ProductsComponent';
import StatusComponent from './StatusComponent';
import AddressComponent from './AddressComponent';
import ChatComponent from './ChatComponent';
import '../CSS/Order.css'





const OrderComponent = () => {

  const { orderId } = useParams();
  const [order, setOrder] = useState([]);
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState(0)
  const [chatMessages, setChatMessages] = useState([
    "Hi, we got your order and started working on it..."
  ]);


  useEffect(() => {
    console.log(`orderId: ${orderId}`)
    // Fetch to get the current order
    fetch(`http://localhost:3600/orders/get_full_order/${orderId}`)
      .then(response => response.json())
      .then(data => {
        if (data) {
          setOrder(JSON.parse(data)[0]);
          setProducts(JSON.parse(JSON.parse(data)[0].order_products));
        }
      })
      .catch(error => console.error('Error fetching order:', error));



  }, []);

  console.log(`order: ${JSON.stringify(order)}`)
  console.log(`products: ${products}`)

  useEffect(() => {
    //check the status
    console.log('timer update')
    fetch(`http://localhost:3600/orders/get_status/${orderId}`)
      .then(response => response.json())
      .then(data => {
        if (data)
          setStatus(data)
      })
      .catch(error => console.error('Error fetching order:', error));

    // check the products
    fetch(`http://localhost:3600/orders/get_ready_products_list/${orderId}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data) {
          JSON.parse(data).map(p_id => {
            let temp = products
            let i = products.findIndex(p => p_id.product_id === p.id)
            if (i !== -1) {
              temp[i].ready = true
              setProducts(temp)
            }
          })
        }

      })
      .catch(error => console.error('Error fetching order:', error));


  }, [setTimeout(10000)])

  const handleSendMessage = (message) => {
    setChatMessages([...chatMessages, message]);
  };

  if (order === null || products === null) {
    return <div>Loading...</div>;
  }

  return (
    <div id='order' >
      <div style={{ flex: 3, padding: '20px' }}>
        <h1>Your order:</h1>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <StatusComponent time={status} totalTime="5" />
          <ProductsComponent products={products} />
        </div>
        <AddressComponent address={`${order.street} ${order.number}, ${order.city}`} />


      </div>

      <div style={{ flex: 2, padding: '20px', backgroundColor: '#fff3cd', borderRadius: '10px' }}>
        <ChatComponent messages={chatMessages} onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default OrderComponent;
