import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CurrentDelivery = ({ route }) => {
  const { userName, userId, currentStatus, currentDelivery } = route.params;
  const [status, setStatus] = useState(currentStatus);
  const [currentOrder, setCurrentOrder] = useState(currentDelivery);
  const texts = ['Get the next delivery', 'Picked up already?', 'Delivered already?'];
  const navigation = useNavigation();

  useEffect(() => {
    if (status === 0) {
      // fetchNewOrder();
    }
  }, [status]);

  // get new order to deliver
  const fetchNewOrder = async () => {
    try {
      console.log("Fetching new order...");
      const response = await fetch(`http://localhost:3600/delivery/getNewOrder/${userId}`);
      const data = await response.json();
      console.log("Response data:", data);
      if (data !== false) {
        setCurrentOrder(data); // No need to parse data again, assuming it's already JSON
        setStatus(1);
      }
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home', { userName: userName, userId: userId })} style={styles.goBack} role="button">
        <Image source={require('../Media/back.png')} style={styles.imageStyle} />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.status}>Ready to pick</Text>
        <TouchableOpacity style={styles.button} onPress={fetchNewOrder} role="button">
          <Text style={styles.buttonText}>Picked Up?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => console.log('Navigate to Chat')} style={styles.chatIcon} role="button">
        <Image source={require('../Media/chat.jpeg')} style={styles.imageStyle} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundImage: 'url("../Media/background.jfif")',
    justifyContent: 'center',
    alignItems: 'center',
  },
  goBack: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  chatIcon: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    zIndex: 1,
  },
  icon: {
    fontSize: 24,
    color: '#000',
  },
  content: {
    alignItems: 'center',
  },
  status: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#000',
  },
  button: {
    backgroundColor: '#FF6347',
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default CurrentDelivery;
