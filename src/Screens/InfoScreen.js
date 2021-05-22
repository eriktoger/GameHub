import React from 'react';
import {StyleSheet, View} from 'react-native';
import {UserInfo} from '../Components/UserInfo';
import AppInfo from '../Components/AppInfo';
import auth from '@react-native-firebase/auth';

const InfoScreen = () => {
  const currentUser = auth().currentUser;
  const isAnonymous = currentUser.isAnonymous;
  return (
    <View style={styles.container}>
      <AppInfo />

      {!isAnonymous && <UserInfo />}
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

export default InfoScreen;
