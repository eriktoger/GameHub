import firestore from '@react-native-firebase/firestore';
import app from '@react-native-firebase/app';
import errorToast from '../Toasts/errorToast';
import successToast from '../Toasts/successToast';
import auth from '@react-native-firebase/auth';

export const getUserInfo = async (id, toast) => {
  try {
    const data = (await firestore().collection('users').doc(id).get()).data();
    return data;
  } catch (error) {
    toast({...errorToast, message: 'Error loading info'});
  }
};

export const updateUserInfo = async (id, newData, toast) => {
  try {
    await firestore().collection('users').doc(id).update(newData);
    toast({...successToast, message: 'User info saved'});
  } catch (error) {
    toast({...errorToast, message: 'Save info failed'});
  }
};

export const updateScore = async (winner, id, toast) => {
  const currentUser = auth().currentUser;
  const increment = app.firestore.FieldValue.increment(1);
  const change =
    winner === currentUser.uid
      ? {
          tictactoe_wins: increment,
        }
      : {
          tictactoe_losses: increment,
        };
  change.game = id;
  try {
    await firestore().collection('users').doc(currentUser.uid).update(change);
  } catch (error) {
    toast({...errorToast, message: 'Error on updating users'});
  }
};
