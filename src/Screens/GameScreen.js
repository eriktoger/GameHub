import React from 'react';
import {StyleSheet, View} from 'react-native';
import TicTacToe from '../Components/TicTacToe';

const GameScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TicTacToe navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    color: 'blue',
  },
});

export default GameScreen;
