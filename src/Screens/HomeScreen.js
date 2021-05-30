import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import auth from '@react-native-firebase/auth';

const HomeScreen = ({navigation}) => {
  const currentUser = auth().currentUser;
  const isAnonymous = currentUser.isAnonymous;
  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        Welcome {isAnonymous ? 'Anonymous' : currentUser.displayName}
      </Text>
      <View style={styles.button}>
        <Button title="Info" onPress={() => navigation.navigate('Info')} />
      </View>
      <View style={styles.button}>
        <Button title="Games" onPress={() => navigation.navigate('Game')} />
      </View>
      <View style={styles.button}>
        <Button
          title="sign out"
          color="red"
          onPress={async () => await auth().signOut()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 100,
    alignSelf: 'center',
    margin: 5,
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
