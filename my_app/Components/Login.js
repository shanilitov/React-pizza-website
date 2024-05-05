import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Signin from './Signin'; // הנחה: הקומפוננטה של Signin קיימת באותו מחברת

const Login = () => {
  const [username, setUsername] = useState('');
  const [Id, setPassword] = useState('');
  const navigation = useNavigation();


  const handleLogin = () => {
    // הוספת לוגיקה לטיפול בהתחברות כאן
    console.log('Username:', username);
    console.log('Id:', Id);

    const fetchLogin = async () => {
      try {
        const response = await fetch(
          `http://localhost:3600/delivery/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify( {
              id: Id,
              name: username
            })
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

    fetchLogin();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome Back!</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Id"
        secureTextEntry={true}
        value={Id}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.signupText} onPress={() => navigation.navigate('Signin')}>
        Don't have an account?
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 30,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
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
  signupText: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default Login;
