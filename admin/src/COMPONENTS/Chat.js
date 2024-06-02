import React, { useState } from "react";
import "../Style/Chat.css";

function Chat() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const handleSendMessage = () => {
        // Handle sending a new message
        setMessages([...messages, { text: newMessage, outgoing: true }]);
        setNewMessage("");
    };

    return (
        <div className="chat">
            <h2>Chat</h2>
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.outgoing ? "message outgoing" : "message incoming"}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="new-message">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Write a new message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Chat;
