import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import Login from './Login';
import firestore from '@react-native-firebase/firestore';
import {UserInfo} from './UserInfo';

const AppInfo = () => {
  const [info, setInfo] = useState();
  const getAppInfo = async () => {
    try {
      const {_data} = await firestore().collection('public').doc('info').get();
      setInfo(_data.text);
    } catch (error) {
      console.log('Error on getting pulbic/info');
    }
  };

  useEffect(() => {
    getAppInfo();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>App info:</Text>
      <Text style={styles.input}>{info}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  input: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
});

export default AppInfo;
