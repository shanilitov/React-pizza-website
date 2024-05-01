import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './Components/Login';
import Home from './Components/Home';
import Signin from './Components/Signin';
import CurrentDelivery from './Components/CurrentDelivery';
import Chat from './Components/Chat';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Chat">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name='Signin' component={Signin}/>
        <Stack.Screen name='CurrentDelivery' component={CurrentDelivery}/>
        <Stack.Screen name='Chat' component={Chat}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
