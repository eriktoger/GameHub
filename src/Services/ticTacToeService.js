import firestore from '@react-native-firebase/firestore';
import errorToast from '../Toasts/errorToast';

export const makeAMove = async (row, coloumn, gameData, gameId, toast) => {
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
    toast({...errorToast, message: 'Save info failed'});
  }
};

export const getGameData = (id, setGameData, toast) => {
  try {
    return firestore()
      .collection('games')
      .doc(id)
      .onSnapshot(async snapshot => {
        setGameData(snapshot.data());
      });
  } catch (error) {
    toast({...errorToast, message: 'Fetching game data failed'});
  }
};
