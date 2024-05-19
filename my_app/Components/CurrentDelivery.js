import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CurrentDelivery = ({route, args}) => {
  const { userName, userId } = route.params;
  const [status, setStatus] = useState(args.status)
  const [currentOrder, setCurrentOrder] = useState(args.CurrentDelivery)
  const texts = ['Get the next delivery', 'Picked up already?', 'Delivered already?']
  const navigation = useNavigation();

  useEffect(() => {
    if(status === 0){
      // get new order to deliver

    }

  }, [status]);



  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('/Home')} style={styles.goBack}>
        <Image source={require('../Media/back.png')} style={styles.imageStyle} />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.status}>Ready to pick</Text>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Picked Up')}>
          <Text style={styles.buttonText}>Picked Up?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => console.log('Navigate to Chat')} style={styles.chatIcon}>
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
    width: 100, // רוחב התמונה
    height: 100, // גובה התמונה
    borderRadius: 50, // חצי הרוחב מייצר מסגרת עגולה
  },
});

export default CurrentDelivery;
