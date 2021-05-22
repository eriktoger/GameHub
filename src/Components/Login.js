import React from 'react';
import {StyleSheet, View, TouchableHighlight, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
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

  const onAnonymousButtonPress = async () => {
    try {
      auth().signInAnonymously();
    } catch (e) {
      console.log('error', e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <GoogleSigninButton
          onPress={async () =>
            await onGoogleButtonPress()
          }></GoogleSigninButton>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableHighlight
          activeOpacity={0.8}
          onPress={onAnonymousButtonPress}>
          <View style={styles.anonymousContainer}>
            <FontAwesomeIcon
              icon={faUser}
              size={20}
              style={styles.anonymousButton}
            />
            <Text>Anonymous Sign in</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  anonymousButton: {
    marginRight: 5,
  },
  anonymousContainer: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: '#FFF',
  },
  buttonContainer: {
    margin: 5,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'blue',
  },
});

export default Login;
