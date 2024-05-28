import React, { useState } from 'react';

const ChatComponent = ({ messages, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div>
      <h2>Shop</h2>
      <div style={{ height: '200px', overflowY: 'scroll', border: '1px solid gray', marginBottom: '10px', padding: '10px', borderRadius: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ backgroundColor: '#fff', margin: '5px', padding: '10px', borderRadius: '10px' }}>
            {msg}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          placeholder="Type a message"
          style={{ flex: 1, padding: '10px', borderRadius: '10px', border: '1px solid gray' }}
        />
        <button onClick={handleSendMessage} style={{ marginLeft: '10px', padding: '10px', borderRadius: '10px', backgroundColor: '#007bff', color: '#fff' }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
