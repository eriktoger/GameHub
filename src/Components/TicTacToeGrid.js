import React from 'react';
import {StyleSheet, View, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useToast} from 'react-native-styled-toast';
import {makeAMove} from '../Services/ticTacToeService';

const TicTacToeGrid = ({
  gameData,
  gameId,
  yourTurn,
  rows,
  coloumns,
  moveMap,
  finished,
}) => {
  const {toast} = useToast();

  return (
    <View style={styles.container}>
      {rows.map(row => (
        <View style={styles.row} key={row}>
          {coloumns.map(coloumn => (
            <TouchableHighlight
              key={coloumn}
              disabled={
                !yourTurn ||
                gameData.player2_name === '' ||
                moveMap.get(`${row}-${coloumn}`) ||
                finished
              }
              onPress={() => makeAMove(row, coloumn, gameData, gameId, toast)}>
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
