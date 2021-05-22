import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import Login from './Components/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './Screens/HomeScreen';
import GameScreen from './Screens/GameScreen';
import InfoScreen from './Screens/InfoScreen';

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

  const onSignout = async () => {
    await auth().signOut();

    setCurrentUser(null);
  };

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
    return <Login setCurrentUser={setCurrentUser} />;
  }

  const isAnonymous = currentUser.isAnonymous;
  return (
    <NavigationContainer>
      <UserContext.Provider value={currentUser}>
        <Stack.Navigator initialRouteName={'Home'}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Game" component={GameScreen} />
          <Stack.Screen name="Info" component={InfoScreen} />
        </Stack.Navigator>
      </UserContext.Provider>
    </NavigationContainer>
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
