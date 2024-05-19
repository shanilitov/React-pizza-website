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
    <NavigationContainer
      linking={{
        prefixes: ['https://delivery.com', 'delivery://'],
        config: {
          screens: {
            Home: 'home',
            Login: 'login',
            Signin: 'signin',
            CurrentDelivery: 'currentDelivery',
            Chat: 'chat',
          },
        },
      }}
      fallback={<Text>Loading...</Text>}
    >
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name='Signin' component={Signin} />
        <Stack.Screen name='CurrentDelivery' component={CurrentDelivery} />
        <Stack.Screen name='Chat' component={Chat} />
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
