import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Signin = () => {
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [Id, setId] = useState('');
  const navigation = useNavigation();

  const handleSignIn = () => {
    // הוספת לוגיקה לטיפול בהרשמה כאן
    console.log('Username:', username);
    console.log('Phone Number:', phoneNumber);
    console.log('Id:', Id);


    const fetchSignin = async () => {
      try {
        const body = {
          id: Id,
          name: username,
          phone: phoneNumber
        }
        console.log(`body: ${body}`)
        const response = await fetch(
          `http://localhost:3600/delivery/signin`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
          }
        );
        const data = await response.json();
        console.log(data)
        if (data !== false) {
          navigation.navigate('Home', {
            userName: username,
            userId: Id,
          });

        }

      } catch (error) {
        console.error('Error fetching chat:', error);
      }
    };

    fetchSignin();

  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>User Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

      <Text style={styles.label}>Phone Number:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />

      <Text style={styles.label}>Id:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Id"
        value={Id}
        onChangeText={(text) => setId(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>SignIn</Text>
      </TouchableOpacity>

      <Text style={styles.text} onPress={() => navigation.navigate('Login')}>Already have an account? </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url("../Media/background.jfif")',
    paddingHorizontal: 30,
    paddingBottom: 50, // עבור גלילה למטה
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#ff6347',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default Signin;
