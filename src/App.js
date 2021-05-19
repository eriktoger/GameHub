import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import Login from './Login';

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

  return (
    <View style={styles.container}>
      <Text> Welcome {currentUser.displayName}</Text>
      <Button title={'sign out'} onPress={onSignout}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'blue',
  },
});

export default App;
