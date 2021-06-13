import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const TicTacToe = ({navigation}) => {
  const [games, setGames] = useState([]);

  const getGames = () => {
    try {
      return firestore()
        .collection('games')
        .where('active', '==', true)
        .where('player2_name', '==', '')
        .onSnapshot(snapshot => {
          const games = snapshot?.docs?.map(doc => ({
            id: doc.id,
            playerName: doc.data().player1_name,
          }));
          setGames(games);
        });
    } catch (error) {
      console.log('Error getting games');
    }
  };

  useEffect(() => {
    const subscriber = getGames();
    return () => subscriber();
  }, []);

  const onNewGame = async () => {
    try {
      const {displayName, uid} = auth().currentUser;
      const game = await firestore()
        .collection('games')
        .add({
          player1_name: displayName ?? 'Anonymous',
          player1_id: uid,
          player2_name: '',
          active: true,
          turn: uid,
          moves: [],
        });

      navigation.navigate('TicTacToe', {id: game.id});
    } catch (error) {
      console.log('Error creating new game');
    }
  };

  const onJoinGame = async id => {
    try {
      const {displayName, uid} = auth().currentUser;
      await firestore()
        .collection('games')
        .doc(id)
        .update({
          player2_name: displayName ?? 'Anonymous',
          player2_id: uid,
        });

      navigation.navigate('TicTacToe', {id});
    } catch (error) {
      console.log('Error updating/joining game');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TicTacToe:</Text>
      <View style={styles.button}>
        <Button title="New Game" onPress={onNewGame} />
      </View>
      <Text style={styles.title}>Open games:</Text>
      {games.map((game, i) => (
        <View key={i} style={styles.button}>
          <Button
            title={`Play against ${game.playerName}`}
            onPress={() => onJoinGame(game.id)}
          />
        </View>
      ))}
      {!games.length && <Text style={styles.text}>No games avaiable</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 200,
    alignSelf: 'center',
    margin: 5,
  },
  container: {
    margin: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
});

export default TicTacToe;
