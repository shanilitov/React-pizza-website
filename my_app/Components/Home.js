import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const Home = ({ route }) => {
  const { userName, userId } = route.params;

  const texts = ['Get the next delivery', 'Picked up already?', 'Delivered already?']
  const [currentOrder, setCurrentOrder] = useState({}) // ההזמנה הנוכחית שהשליח עובד עליה
  const [status, setStatus] = useState(0)
  const [flag, setFlag] = useState(true)

  const navigation = useNavigation();

  useEffect(() => {
    if (flag)
      checkIfUserHasOrderNow()

  }, [status]);

  const checkIfUserHasOrderNow = async () => {
    try {
      const response = await fetch(
        `http://localhost:3600/delivery/getCurrentOrder/${userId}`
      );
      if (response.status === 200) {
        const data = await response.json();
        console.log(`data is ${data}`)
        if (data == false) {
          setStatus(0)
          setFlag(true)
        }
        if (data !== false) {
          //לסדר את הסטטוס לסטטוס המתאים לפי ההזמנה 
          // data = {orderId, status, city, street, number} or false.
          setFlag(false)
          setCurrentOrder(data)
          getOrderStatus(data.orderId)
        }
      }
      else {
        // היתה תקלה בשרת
        // צריך לסדר שתהיה הודעת שגיאה יפה.
      }

    } catch (error) {
      console.error('Error fetching chat:', error);
    }
  }
  const getOrderStatus = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:3600/delivery/getOredrStatus/${orderId}`
      );
      if (response.status === 200) {
        const data = await response.json();
        console.log(`data is ${data}`)
        if (data !== false) {
          setFlag(false)
          setStatus(data)
        }
      }
      else {
        // היתה תקלה בשרת
        // צריך לסדר שתהיה הודעת שגיאה יפה.
      }

    } catch (error) {
      console.error('Error fetching chat:', error);
    }
  }

  // const buttonClicked = async () => {
  //   navigation.navigate('CurrentDelivery', {
  //     userName: userName,
  //     userId: userId,
  //   }, {
  //     currentOrder: currentOrder,
  //     status: status
  //   });
  //   // console.log(`in button clicked, the status now is: ${status}`)
  //   // // צריך לסדר שלפי הסטטוס יהיה הפעולה של הכפתור.
  //   // switch (status) {
  //   //   case 0: // אין הזמנה נוכחית -> צריך לאפשר לקבל הזמנה חדשה
  //   //     getNewOrder()
  //   //     break;
  //   //   case 1: // יש הזמנה שממתינה לאיסוף -> צריך לאפשר לשליח לעדכן שהוא אסף את המשלוח מהסניף

  //   //     break;
  //   //   case 2: // ההזמנה ממתינה למסירה -> צריך לאפשר לשליח לדווח על מסירה
  //   //     break;
  //   //   default:
  //   //     break;
  //   // }
  // }
  const buttonClicked = async () => {
    navigation.navigate('CurrentDelivery', {
      userName: userName,
      userId: userId,
      currentOrder: currentOrder,
      currentStatus: status
    });
  }



  const getNewOrder = async () => {
    // אין הזמנה נוכחית -> צריך לאפשר לקבל הזמנה חדשה
    try {
      const response = await fetch(
        `http://localhost:3600/delivery/getCurrentOrder/${userId}`
      );
      if (response.status === 200) {
        const data = await response.json();
        console.log(`data is ${data}`)

      }
      else {

      }

    }
    catch (err) {

    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.goBack}>
        <Image source={require('../Media/back.png')} style={styles.imageStyle} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log('Navigate to Profile')} style={styles.profileButton}>
        <Image source={require('../Media/login.jpg')} style={styles.imageStyle} />
        <Text style={styles.icon}>{userName}</Text>
      </TouchableOpacity>

      <View style={styles.content}>

        <Text style={styles.greeting}>{status > 0 ? `Adress: ${currentOrder.street} ${currentOrder.number}, ${currentOrder.city}` : `You don't have order to deliver now, click the button to get a new one`}</Text>


        <TouchableOpacity style={styles.button} onPress={() => buttonClicked()}>
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
    backgroundImage: 'url("../Media/background.jfif")',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
  },
  profileButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    flexDirection: 'row'
  },
  icon: {
    fontSize: 24,
    color: 'black',
  },
  content: {
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: 'black',
    backgroundColor: '#9e7e737d',
    borderRadius: 25,
    margin: 20,
    textAlign: 'center',
    padding: 10

  },
  button: {
    backgroundColor: '#ff6347',
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginTop: 20,
    textAlign: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageStyle: {
    width: 40, // רוחב התמונה
    height: 40, // גובה התמונה
    borderRadius: 50, // חצי הרוחב מייצר מסגרת עגולה
  },
  goBack: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
});

export default Home;
