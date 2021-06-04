import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import Login from './Components/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ThemeProvider} from 'styled-components';
import {ToastProvider} from 'react-native-styled-toast';
import HomeScreen from './Screens/HomeScreen';
import GameScreen from './Screens/GameScreen';
import InfoScreen from './Screens/InfoScreen';
import TicTacToeScreen from './Screens/TicTacToeScreen';

const theme = {
  space: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48],
  colors: {
    text: '#0A0A0A',
    background: '#FFF',
    border: '#E2E8F0',
    muted: '#F0F1F3',
    success: '#7DBE31',
    error: '#FC0021',
    info: '#00FFFF',
  },
};

const Stack = createStackNavigator();

const App = () => {
  const [currentUser, setCurrentUser] = useState();

  const getCurrentUser = () => {
    const user = auth().currentUser;
    setCurrentUser(user);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(getCurrentUser);
    return subscriber;
  }, []);

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        {!currentUser ? (
          <Login />
        ) : (
          <NavigationContainer>
            <Stack.Navigator initialRouteName={'Home'}>
              <>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Game" component={GameScreen} />
                <Stack.Screen name="Info" component={InfoScreen} />
                <Stack.Screen name="TicTacToe" component={TicTacToeScreen} />
              </>
            </Stack.Navigator>
          </NavigationContainer>
        )}
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
