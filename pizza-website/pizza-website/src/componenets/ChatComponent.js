import { Button } from 'bootstrap';
import React, { useState } from 'react';

const ChatComponent = ({ messages, onSendMessage, onConnectionChange, connection, takeAway }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };
  console.log(`take away? ${takeAway}`)

  const myMessages = {
    backgroundColor: 'red',
    margin: '5px',
    padding: '10px',
    borderRadius: '10px',
    color: 'black',
    alignSelf: 'flex-end',
    maxWidth: '60%',
    wordWrap: 'break-word'
  };

  const inCommingMessages = {
    backgroundColor: '#524c4c',
    margin: '5px',
    padding: '10px',
    borderRadius: '10px',
    color: 'red',
    alignSelf: 'flex-start',
    maxWidth: '60%',
    wordWrap: 'break-word'
  };

  return (
    <div>
      <button onClick={()=> takeAway == null ? onConnectionChange(): console.log('Take-away')} style={{ marginLeft: '10px', padding: '10px', borderRadius: '10px', backgroundColor: 'red', color: 'black' }}>
        {connection === 'CS' ? 'SHOP' : 'DELIVER'}
      </button>
      <div style={{ height: '200px', overflowY: 'scroll', border: '1px solid gray', marginBottom: '10px', padding: '10px', borderRadius: '10px', display: 'flex', flexDirection: 'column' }}>
        {messages.map((msg, index) => (
          <div key={index} style={msg.connection === 'CS' || msg.connection === 'CD' ? myMessages : inCommingMessages}>
            {msg.message}
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
        <button onClick={handleSendMessage} style={{ marginLeft: '10px', padding: '10px', borderRadius: '10px', backgroundColor: 'red', color: 'black' }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
