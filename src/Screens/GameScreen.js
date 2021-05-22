import React from 'react';
import {StyleSheet, View} from 'react-native';
import TicTacToe from '../Components/TicTacToe';

const GameScreen = () => {
  return (
    <View style={styles.container}>
      <TicTacToe />
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

export default GameScreen;
