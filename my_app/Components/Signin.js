import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const Signin = () => {
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [Id, setId] = useState('');
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [email, setEmail] = useState('')
  const navigation = useNavigation();

  useEffect(() => {
    getBranches();
  }, []);

  async function getBranches() {
    try {
      const response = await fetch('http://localhost:3600/branches/info');
      const ans = await response.json();
      if (typeof ans === 'string') {
        const parsedAns = JSON.parse(ans);
        if (Array.isArray(parsedAns)) {
          setBranches(parsedAns);
        } else {
          console.error('Parsed branches data is not an array:', parsedAns);
        }
      } else if (Array.isArray(ans)) {
        setBranches(ans);
      } else {
        console.error('Branches data is not an array:', ans);
      }
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  }

  const handleSignIn = () => {
    console.log('Username:', username);
    console.log('Phone Number:', phoneNumber);
    console.log('Id:', Id);
    console.log('Selected Branch:', selectedBranch);
    console.log('Email:', email);

    const fetchSignin = async () => {
      try {
        const body = {
          id: Id,
          name: username,
          phone: phoneNumber,
          branch: selectedBranch,
          email: email
        };
        const response = await fetch(
          'http://localhost:3600/delivery/signin',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
          }
        );
        const data = await response.json();
        if (data !== false) {
          navigation.navigate('Home', {
            userName: username,
            userId: Id,
          });
        }
      } catch (error) {
        console.error('Error fetching signin:', error);
      }
    };
    if (username !== '' && phoneNumber !== '' && Id !== '' && selectedBranch > 0 && email !== '')
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
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <Text style={styles.label}>Id:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Id"
        value={Id}
        onChangeText={(text) => setId(text)}
      />

      <Text style={styles.label}>Branch:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedBranch}
          onValueChange={(itemValue) => setSelectedBranch(itemValue)}
        >
          <Picker.Item label="Select a branch" value="" />
          {branches.map((branch) => (
            <Picker.Item key={branch.id} label={branch.name} value={branch.id} />
          ))}
        </Picker>
      </View>

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
    paddingHorizontal: 30,
    paddingBottom: 50,
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
  pickerContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
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
