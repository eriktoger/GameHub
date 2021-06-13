import React from 'react';
import {StyleSheet, View} from 'react-native';
import {UserInfo} from '../Components/UserInfo';
import AppInfo from '../Components/AppInfo';
import auth from '@react-native-firebase/auth';
import useOrientation from '../hooks/useOrientation';
const InfoScreen = () => {
  const currentUser = auth().currentUser;
  const isAnonymous = currentUser.isAnonymous;
  const orientation = useOrientation();
  const flexDirection = orientation === 'LANDSCAPE' ? 'row' : 'column';

  return (
    <View style={styles({flexDirection}).container}>
      <AppInfo orientation={orientation} />
      {!isAnonymous && (
        <UserInfo userId={currentUser.uid} orientation={orientation} />
      )}
    </View>
  );
};

const styles = ({flexDirection}) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: flexDirection,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#71c5f0',
    },
  });

export default InfoScreen;
