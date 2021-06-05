import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getAppInfo} from '../Services/publicService';
import {useToast} from 'react-native-styled-toast';

const AppInfo = ({orientation}) => {
  const [info, setInfo] = useState();
  const {toast} = useToast();
  const width = orientation === 'LANDSCAPE' ? '40%' : '80%';
  useEffect(() => {
    const fetchData = async () => {
      const text = await getAppInfo(toast);
      setInfo(text);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles({width}).container}>
      <Text style={styles().title}>App info:</Text>
      <Text style={styles().input}>{info}</Text>
    </View>
  );
};

const styles = ({width} = {}) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 20,
      backgroundColor: 'white',
      padding: 10,
      marginBottom: 20,
      borderRadius: 10,
      width: width,
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
