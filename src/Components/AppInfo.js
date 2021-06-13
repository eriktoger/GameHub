import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getAppInfo} from '../Services/publicService';
import {useToast} from 'react-native-styled-toast';

const AppInfo = ({orientation}) => {
  const [info, setInfo] = useState();
  const {toast} = useToast();
  const flex = orientation === 'LANDSCAPE' ? 1 : 0;
  useEffect(() => {
    const fetchData = async () => {
      const text = await getAppInfo(toast);
      setInfo(text);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles({flex}).container}>
      <Text style={styles().title}>App info:</Text>
      <Text style={styles().input}>{info}</Text>
    </View>
  );
};

const styles = ({flex} = {}) =>
  StyleSheet.create({
    container: {
      backgroundColor: 'white',
      borderRadius: 10,
      margin: 20,
      padding: 10,
      flex,
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
