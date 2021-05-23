import React from 'react';
import {StyleSheet, Text, View, Button, TouchableHighlight} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';

const TicTacToeGrid = ({
  gameData,
  gameId,
  yourTurn,
  rows,
  coloumns,
  moveMap,
  finished,
}) => {
  const onPress = async (row, coloumn) => {
    try {
      const {moves, turn} = gameData;
      moves.push({row, coloumn, player: turn});
      await firestore()
        .collection('games')
        .doc(gameId)
        .update({
          moves,
          turn:
            turn === gameData.player1_id
              ? gameData.player2_id
              : gameData.player1_id,
        });
    } catch (error) {
      console.log('Error playing a move');
    }
  };

  return (
    <View style={styles.container}>
      {rows.map(row => (
        <View style={styles.row} key={row}>
          {coloumns.map(coloumn => (
            <TouchableHighlight
              key={coloumn}
              disabled={
                !yourTurn ||
                gameData.player2_name == '' ||
                moveMap.get(`${row}-${coloumn}`) ||
                finished
              }
              onPress={() => onPress(row, coloumn)}>
              <View style={styles.square}>
                {moveMap.get(`${row}-${coloumn}`) === gameData.player1_id && (
                  <Icon size={40} name="circle-o" color="blue" />
                )}
                {moveMap.get(`${row}-${coloumn}`) === gameData.player2_id && (
                  <Icon size={40} name="times" color="red" />
                )}
              </View>
            </TouchableHighlight>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    width: 70,
    height: 70,
    borderColor: 'black',
    borderRadius: 1,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TicTacToeGrid;
