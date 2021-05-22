import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';

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
