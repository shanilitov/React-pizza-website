import React, { useEffect, useState } from "react";
import "../Style/Chat.css";
import { useNavigate } from "react-router-dom";

function Chat({ order_id }) {
    const [inputMessage, setInputMessage] = useState('');
    const [update, setUpdate] = useState(0);
    const [connection, setConnection] = useState('SC'); //שומר את ההגדרה עם מי הצ'אט הנוכחי
    const [messages, setMessages] = useState([]);

    const navigation = useNavigate();

    useEffect(() => {
        const fetchChat = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3600/chat/get/${order_id}/${connection}`
                );
                const data = await response.json();
                if (data !== false)
                    setMessages(Array.isArray(data) ? data : JSON.parse(data));
            } catch (error) {
                console.error('Error fetching chat:', error);
            }
        };
        fetchChat();
    }, [connection, update, order_id]);

    const handleSendMessage = async () => {
        if (inputMessage.trim() !== '') {
            try {
                await fetch('http://localhost:3600/chat/send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: inputMessage,
                        orderId: order_id,
                        connection: connection,
                    }),
                });
                setInputMessage('');
                setUpdate(update + 1);
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    const changeConnection = async () => {
        setConnection((prev) => (prev === 'SC' ? 'SD' : 'SC'));
    };

    return (
        <div className="chat">
            <button onClick={changeConnection} className="connection">
                {connection === 'SC' ? 'CLIENT' : 'DELIVER'}
            </button>
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.connection === 'SC' || msg.connection === 'SD' ? 'incoming' : 'outgoing'}`}>
                        {msg.message}
                    </div>
                ))}
            </div>
            <div className="new-message">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Write a new message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Chat;
