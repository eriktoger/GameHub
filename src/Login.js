import React from 'react';
import {StyleSheet, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '948250627762-o7a3a2invei0oh7t0qtar1ltri91vjop.apps.googleusercontent.com',
});

const Login = () => {
  const onGoogleButtonPress = async () => {
    try {
      const user = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(user.idToken);
      auth().signInWithCredential(googleCredential);
    } catch (e) {
      console.log('error', e);
    }
  };

  return (
    <View style={styles.container}>
      <GoogleSigninButton
        onPress={async () => await onGoogleButtonPress()}></GoogleSigninButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'blue',
  },
});

export default Login;
