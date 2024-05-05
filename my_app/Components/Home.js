import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = ({ route }) => {
  const { userName, userId } = route.params;

  const texts = ['Get new order to deliver', 'Picked up already?', 'Delivered already?']
  const [currentOrder, setCurrentOrder] = useState({}) // ההזמנה הנוכחית שהשליח עובד עליה
  const [status, setStatus] = useState(0)
  const [flag, setFlag] = useState(true)

  useEffect(() => {
    if (flag)
      checkIfUserHasOrderNow()

  }, [status]);

  const checkIfUserHasOrderNow = async () => {
    try {
      const response = await fetch(
        `http://localhost:3600/getCurrentOrder/${userId}`
      );
      if (response.status === 200) {
        const data = await response.json();
        console.log(data)
        if (data == false) {
          setStatus(0)
        }
        if (data !== false) {
          //לסדר את הסטטוס לסטטוס המתאים לפי ההזמנה 
          

        }
      }
      else {

      }

    } catch (error) {
      console.error('Error fetching chat:', error);
    }
  }

  const buttonClicked = async () => {

  }




  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => console.log('Navigate to Profile')} style={styles.profileButton}>
        <Text style={styles.icon}>👤</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.greeting}>Hi, {userName}</Text>

        <TouchableOpacity style={styles.button} onPress={() => console.log('Navigate to Current Delivery')}>
          <Text style={styles.buttonText}>{texts[status]}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => console.log('Navigate to Activities')}>
          <Text style={styles.buttonText}>My Activities</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  icon: {
    fontSize: 24,
    color: '#FFD700',
  },
  content: {
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#FFD700',
  },
  button: {
    backgroundColor: '#FF4500',
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Home;
