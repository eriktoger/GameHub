import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import {useToast} from 'react-native-styled-toast';
import {googleLogin, anonymousLogin} from '../Services/loginService';
import {CustomButton} from './CustomButtom';

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
    const success = await loginMethod(toast);
    if (!success) {
      setLoad(false);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../images/games.jpg')}
        style={styles.backgroundImage}
        imageStyle={imageStyles.background}>
        <CustomButton
          text={'Google Sign in'}
          load={load}
          onPress={() => onPress(googleLogin)}
          icon={'google'}
        />
        <CustomButton
          text={'Anonymous Sign in'}
          load={load}
          onPress={() => onPress(anonymousLogin)}
          icon={'user'}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  anonymousButton: {
    marginRight: 10,
    marginLeft: 10,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 30,
    width: 30,
    marginRight: 5,
    marginLeft: 5,
  },
});

const imageStyles = StyleSheet.create({
  background: {
    opacity: 0.7,
  },
});

export default Login;
