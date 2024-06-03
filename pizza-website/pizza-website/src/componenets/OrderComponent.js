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
  const [messages, setMessages] = useState([]);

  const [update, setUpdate] = useState(0)
  const [connection, setConnection] = useState('CS') //שומר את ההגדרה עם מי הצ'אט הנוכחי


  useEffect(() => {
    console.log(`orderId: ${orderId}`);
    // Fetch to get the current order
    fetch(`http://localhost:3600/orders/get_full_order/${orderId}`)
      .then(response => response.json())
      .then(data => {
        console.log(`data is ${data}`);
        if (data) {
          const orderData = JSON.parse(data)[0];
          console.log(`orderData is ${orderData}`);
          if (orderData !== undefined) {
            setOrder(orderData);
            console.log(`products from orderData: ${orderData.order_products}`);
            setProducts(JSON.parse(orderData.order_products));
          }
        }
      })
      .catch(error => console.error('Error fetching order:', error));
  }, [orderId]);
  

  // יש להשתמש באפשרות useEffect על מנת לקבל את הצ'אט בעת טעינת הדף או כל שינוי בערכי connection
  useEffect(() => {
    const fetchChat = async () => {
      try {
        const response = await fetch(
          `http://localhost:3600/chat/get/${orderId}/${connection}`
        );
        const data = await response.json();
        console.log(data)
        if (data !== false)
          // כאן תוכלי לעדכן את הצ'אט עם ההודעות מהשרת
          setMessages(JSON.parse(data));
      } catch (error) {
        console.error('Error fetching chat:', error);
      }
    };
    console.log('update')
    fetchChat();
  }, [connection, update]);

  // console.log(`order: ${JSON.stringify(order)}`)
  // console.log(`products: ${products}`)

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

  const handleSendMessage = async (inputMessage) => {
    try {
      const response = await fetch('http://localhost:3600/chat/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          orderId: orderId, // ערך מסוים של הזמנה
          connection: connection,
        }),
      });
      const data = await response.json();
      // כאן תוכלי לעדכן את הצ'אט עם ההודעה החדשה מהשרת אם יש צורך
      console.log('Message sent:', data);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setUpdate(update + 1)

  };

  const onConnectionChange = () => {
    if (connection == 'CS')
      setConnection('CD')
    else
      setConnection('CS')
  }


  if (order === null || products === null) {
    return <div>Loading...</div>;
  }

  return (
    <div id='order' >
      <div id='leftdiv' style={{ flex: 3, padding: '20px' }}>
        <h1>Your order:</h1>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <StatusComponent time={status} totalTime="5" />
          <ProductsComponent products={products} />
        </div>
        <AddressComponent address={`${order.street} ${order.number}, ${order.city}`} />
      </div>
      <div style={{ flex: 2, padding: '20px', backgroundColor: 'black', borderRadius: '10px' }}>
        <ChatComponent messages={messages} onSendMessage={handleSendMessage} onConnectionChange={onConnectionChange} connection={connection} />
      </div>
    </div>
  );
};

export default OrderComponent;
