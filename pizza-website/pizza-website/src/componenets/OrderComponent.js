import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductsComponent from './ProductsComponent';
import StatusComponent from './StatusComponent';
import AddressComponent from './AddressComponent';
import ChatComponent from './ChatComponent';





const OrderComponent = () => {
  // const order = {
  //   accept: 0,
  //   city: "ashdod",
  //   client_id: 583289595,
  //   comment: "Thank you guys!\n",
  //   id: 3,
  //   name: "shani litov",
  //   number: 1,
  //   order_date: "2024-05-22T21:00:00.000Z",
  //   price: 25,
  //   street: "s"
  // };

  // const products = [
  //   { product_id: 1, name: "item 1", quantity: 2, price: 10, status: "preparing" },
  //   { product_id: 2, name: "item 2", quantity: 1, price: 5, status: "ready" },
  //   { product_id: 3, name: "item 3", quantity: 3, price: 15, status: "preparing" },
  //   { product_id: 4, name: "item 4", quantity: 1, price: 20, status: "preparing" }
  // ];

  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    "Hi, we got your order and started working on it..."
  ]);

  useEffect(() => {
    console.log(`orderId: ${orderId}`)
    // Fetch order data
    fetch(`http://localhost:3600/orders/get_full_order/${orderId}`)
      .then(response => response.json())
      .then(data => {
        console.log(`@order is: ${JSON.stringify(JSON.parse(data)[0])}`)
        // console.log(`order is: ${(data.order_products)}`)
        setOrder(JSON.stringify(JSON.parse(data)[0]));
        // console.log(`order: ${order}`)
        setProducts(JSON.parse(JSON.parse(data)[0].order_products));
        // console.log(`products: ${products}`)
      })
      .catch(error => console.error('Error fetching order:', error));

  }, []);

  console.log(`order: ${order}`)
  console.log(`products: ${products}`)

  useEffect(() => {
    //check the status
    console.log('timer update')
  }
    , 10000)

  const handleSendMessage = (message) => {
    setChatMessages([...chatMessages, message]);
  };

  if (order === null ||  products === null) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', padding: '20px', backgroundColor: '#f8d7da', borderRadius: '10px', height: '100vh' }}>
      <div style={{ flex: 3, padding: '20px' }}>
        <h1>Your order:</h1>

        <ProductsComponent products={products} />
        <StatusComponent time="15 min" />
        <AddressComponent address={`${order.street}, ${order.city}`} />
      </div>

      <div style={{ flex: 2, padding: '20px', backgroundColor: '#fff3cd', borderRadius: '10px' }}>
        <ChatComponent messages={chatMessages} onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default OrderComponent;
