import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const Signin = () => {
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleSignIn = () => {
    // הוספת לוגיקה לטיפול בהרשמה כאן
    console.log('Username:', username);
    console.log('Phone Number:', phoneNumber);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Repeat Password:', repeatPassword);
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

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <Text style={styles.label}>Repeat Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Repeat your password"
        secureTextEntry={true}
        value={repeatPassword}
        onChangeText={(text) => setRepeatPassword(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>SignIn</Text>
      </TouchableOpacity>

      <Text style={styles.text}>Already have an account? </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
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
    backgroundColor: '#ff5a5f',
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
