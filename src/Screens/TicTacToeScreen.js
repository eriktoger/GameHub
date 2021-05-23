import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Grid from '../Components/TicTacToeGrid';
import auth from '@react-native-firebase/auth';

const calcWinner = (rows, coloumns, winCondition, moveMap, setWinner) => {
  for (let r = 0; r < rows.length; r++) {
    for (let c = 0; c < coloumns.length; c++) {
      const player = moveMap.get(`${r}-${c}`);
      if (player) {
        let horizontalWin = true;
        for (let w = 1; w < winCondition; w++) {
          if (player !== moveMap.get(`${r + w}-${c}`)) {
            horizontalWin = false;
            break;
          }
        }

        let verticalWin = true;
        for (let w = 1; w < winCondition; w++) {
          if (player !== moveMap.get(`${r}-${c + w}`)) {
            verticalWin = false;
            break;
          }
        }

        let rightDiagonalWin = true;
        for (let w = 1; w < winCondition; w++) {
          if (player !== moveMap.get(`${r + w}-${c + w}`)) {
            rightDiagonalWin = false;
            break;
          }
        }

        let leftDiagonalWin = true;
        for (let w = 1; w < winCondition; w++) {
          if (player !== moveMap.get(`${r - w}-${c - w}`)) {
            leftDiagonalWin = false;
            break;
          }
        }

        if (
          horizontalWin ||
          verticalWin ||
          rightDiagonalWin ||
          leftDiagonalWin
        ) {
          setWinner(player);
        }
      }
    }
  }
};

const TicTacToeScreen = ({route}) => {
  const {id} = route.params ?? {};
  const [gameData, setGameData] = useState();
  const [winner, setWinner] = useState();
  const currentUser = auth().currentUser;

  const getGameData = () => {
    try {
      return firestore()
        .collection('games')
        .doc(id)
        .onSnapshot(async snapshot => {
          setGameData(snapshot.data());
        });
    } catch (error) {
      console.log('Error on getting public/info');
    }
  };

  useEffect(() => {
    const subscriber = getGameData();
    return () => subscriber();
  }, []);

  if (!gameData) {
    return (
      <View style={styles.container}>
        <Text> Loading...</Text>
      </View>
    );
  }

  const moveMap = new Map();
  gameData.moves.forEach(({row, coloumn, player}) => {
    moveMap.set(`${row}-${coloumn}`, player);
  });

  const winCondition = 3;
  const rows = [0, 1, 2];
  const coloumns = [0, 1, 2];
  if (!winner) {
    calcWinner(rows, coloumns, winCondition, moveMap, setWinner);
  }

  const yourTurn = gameData.turn === currentUser.uid;
  return (
    <View>
      <Text style={styles.title}>
        It is {yourTurn ? 'your turn' : 'the oppenents turn'}
      </Text>
      <Text style={styles.title}>
        {gameData.player2_name === '' && 'Waiting for an oponent'}
      </Text>
      <Grid
        gameData={gameData}
        yourTurn={yourTurn}
        gameId={id}
        finished={!!winner}
        rows={rows}
        coloumns={coloumns}
        moveMap={moveMap}></Grid>
      <Text style={styles.title}>
        {winner === gameData.player1_id && `${gameData.player1_name} won!`}
      </Text>
      <Text style={styles.title}>
        {winner &&
          winner === gameData.player2_id &&
          `${gameData.player2_name} won!`}
      </Text>
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
    margin: 10,
    alignSelf: 'center',
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
  },
});

export default TicTacToeScreen;
