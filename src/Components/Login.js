import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  ActivityIndicator,
} from 'react-native';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {useToast} from 'react-native-styled-toast';
import {googleLogin, anonymousLogin} from '../Services/loginService';

const Login = () => {
  const {toast} = useToast();
  const [load, setLoad] = useState(false);

  if (load) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  const onPress = async loginMethod => {
    setLoad(true);
    await loginMethod(toast);
    setLoad(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <GoogleSigninButton
          onPress={() => onPress(googleLogin)}
          disabled={load}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableHighlight
          activeOpacity={0.8}
          onPress={() => onPress(anonymousLogin)}
          disabled={load}>
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
  },
});

export default Login;
