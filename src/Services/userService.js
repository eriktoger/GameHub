import firestore from '@react-native-firebase/firestore';
import errorToast from '../Toasts/errorToast';
import successToast from '../Toasts/successToast';

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
