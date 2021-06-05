import firestore from '@react-native-firebase/firestore';
import errorToast from '../Toasts/errorToast';

export const getAppInfo = async toast => {
  try {
    const data = (
      await firestore().collection('public').doc('info').get()
    ).data();
    return data.text;
  } catch (error) {
    toast({...errorToast, message: 'Error fetching app info'});
    return '';
  }
};
