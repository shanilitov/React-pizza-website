import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [orderId, setOrderId] = useState(151)


  const [update, setUpdate] = useState(0)
  const [connection, setConnection] = useState('DS') //שומר את ההגדרה עם מי הצ'אט הנוכחי

  //websocket:
  const WebSocket = require('websocket').w3cwebsocket;
  const socket = new WebSocket('ws://localhost:3600'); // או עם wss לחיבור מאובטח

  socket.onopen = () => {
    console.log('WebSocket connection established.');

    // שליחת ID של הלקוח לשרת
    const clientId = `${orderId}${connection}` // ה-ID של הלקוח
    const message = { type: 'client_id', id: clientId }; // יצירת הודעה עם סוג 'client_id' וה-ID של הלקוח
    socket.send(JSON.stringify(message));
  }

  socket.onmessage = (event) => {
    console.log('Message received from server:', event.data);

  };

  socket.onclose = (event) => {
    console.log('WebSocket connection closed:', event);
  };



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

    fetchChat();
  }, [connection, update]);


  const handleSendMessage = async () => {
    if (inputMessage.trim() !== '') {
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
      setInputMessage('');
      setUpdate(update + 1)
    }
  };




  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => console.log('Navigate to CurrentDelivery')} style={styles.goBack}>
        <Text style={styles.icon}>⬅️</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <TouchableOpacity style={styles.client}>
          <Text style={styles.clientText}>Client</Text>
          <Text style={styles.icon}>👤</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.chatContainer}>
        {messages.map((message, index) => (
          <View key={index} style={[styles.messageContainer, message.connection === 'DS' ? styles.sentMessage : styles.receivedMessage]}>
            <Text style={styles.messageText}>{message.message}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={inputMessage}
          onChangeText={(text) => setInputMessage(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  goBack: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  icon: {
    fontSize: 24,
    color: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  client: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clientText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5,
  },
  chatContainer: {
    flexGrow: 1,
    marginTop: 20,
  },
  messageContainer: {
    maxWidth: '70%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#FF6347',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0E0E0',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  sendButton: {
    marginLeft: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FF6347',
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Chat;
