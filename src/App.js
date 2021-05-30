import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
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
export const UserContext = React.createContext(null);

const App = () => {
  const [loadingUser, setLoadingUser] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  const getCurrentUser = () => {
    const user = auth().currentUser;
    setCurrentUser(user);
    setLoadingUser(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(getCurrentUser);
    return subscriber;
  }, []);

  useEffect(() => {
    getCurrentUser();
  }, []);

  if (loadingUser) {
    return (
      <View style={styles.container}>
        <Text> Loading...</Text>
      </View>
    );
  }

  if (!currentUser) {
    return (
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <Login setCurrentUser={setCurrentUser} />
        </ToastProvider>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <NavigationContainer>
          <UserContext.Provider value={currentUser}>
            <Stack.Navigator initialRouteName={'Home'}>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Game" component={GameScreen} />
              <Stack.Screen name="Info" component={InfoScreen} />
              <Stack.Screen name="TicTacToe" component={TicTacToeScreen} />
            </Stack.Navigator>
          </UserContext.Provider>
        </NavigationContainer>
      </ToastProvider>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 100,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    color: 'blue',
  },
  message: {
    alignSelf: 'center',
    margin: 10,
    fontSize: 24,
  },
});

export default App;
