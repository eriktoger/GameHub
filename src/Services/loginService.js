import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import errorToast from '../Toasts/errorToast';

GoogleSignin.configure({
  webClientId:
    '948250627762-o7a3a2invei0oh7t0qtar1ltri91vjop.apps.googleusercontent.com',
});

export const registerNewUser = async (id, toast) => {
  try {
    const {exists} = await firestore().collection('users').doc(id).get();
    if (!exists) {
      const baseScore = {
        tictactoe_wins: 0,
        tictactoe_losses: 0,
      };
      await firestore().collection('users').doc(id).set(baseScore);
    }
  } catch (error) {
    toast({...errorToast, message: 'Error register new user'});
  }
};

export const googleLogin = async toast => {
  try {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    await auth().signInWithCredential(googleCredential);

    const user = auth().currentUser;
    if (user && !user.isAnonymous) {
      await registerNewUser(user.uid, toast);
    }
  } catch (error) {
    toast({...errorToast, message: 'Error login in user'});
  }
};

export const anonymousLogin = async toast => {
  try {
    await auth().signInAnonymously();
  } catch (e) {
    toast({...errorToast, message: 'Error login in user'});
  }
};
