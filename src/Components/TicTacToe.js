import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import Login from './Login';
import firestore from '@react-native-firebase/firestore';
import {UserInfo} from './UserInfo';

const TicTacToe = () => {
  const [games, setGames] = useState([]);
  const getGames = async () => {
    try {
      console.log('start');
      const activeGames = await firestore()
        .collection('games')
        .where('active', '==', true)
        .get();
      const gameIds = [];
      for (const doc of activeGames.docs) {
        console.log(doc.id, '=>', doc.data());
        gameIds.push(doc.id);
      }
      setGames(gameIds);
    } catch (error) {
      console.log('Error on getting public/info');
    }
  };

  useEffect(() => {
    getGames();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TicTacToe:</Text>
      <Button title="New Game" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  input: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
});

export default TicTacToe;
