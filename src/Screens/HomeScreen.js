import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import auth from '@react-native-firebase/auth';

const HomeScreen = ({navigation}) => {
  const currentUser = auth().currentUser;
  const onSignout = async () => {
    await auth().signOut();
  };
  const isAnonymous = currentUser.isAnonymous;
  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        Welcome {isAnonymous ? 'Anonymous' : currentUser.displayName}
      </Text>
      <Button title="Info" onPress={() => navigation.navigate('Info')} />
      <Button title="Games" onPress={() => navigation.navigate('Game')} />
      <Button title="sign out" color="red" onPress={onSignout} />
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

export default HomeScreen;
