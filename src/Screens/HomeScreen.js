import React from 'react';
import {StyleSheet, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {CustomButton} from '../Components/CustomButtom';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <CustomButton
        text={'Info'}
        icon={'info'}
        onPress={() => navigation.navigate('Game')}
      />
      <CustomButton
        text={'Games'}
        icon={'gamepad'}
        onPress={() => navigation.navigate('Game')}
      />
      <CustomButton
        text={'Sign out'}
        icon={'sign-out'}
        onPress={async () => await auth().signOut()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#71c5f0',
  },
});

export default HomeScreen;
