import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import Login from './Login';
import firestore from '@react-native-firebase/firestore';
import {UserInfo} from './UserInfo';
import AppInfo from './AppInfo';
import TicTacToe from './TicTacToe';

const App = () => {
  const [loadingUser, setLoadingUser] = useState(true);
  const [currentUser, setCurrentUser] = useState();
  const [userInfo, setUserInfo] = useState({});

  const getCurrentUser = async () => {
    const user = auth().currentUser;
    setCurrentUser(user);
    setLoadingUser(false);
    if (user?.uid) {
      const {_data} = await firestore().collection('users').doc(user.uid).get();
      setUserInfo({id: user.uid, data: _data});
    }
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
    <View style={styles.container}>
      <Text style={styles.message}>
        {' '}
        Welcome {isAnonymous ? 'Anonymous' : currentUser.displayName}
      </Text>
      <AppInfo />
      <TicTacToe />

      {!isAnonymous && <UserInfo userInfo={userInfo} />}

      <View style={styles.button}>
        <Button color="red" title={'sign out'} onPress={onSignout} />
      </View>
    </View>
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
