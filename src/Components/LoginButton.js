import React from 'react';
import {StyleSheet, View, TouchableHighlight, Text} from 'react-native';

export const LoginButton = ({text, load, onPress, Icon}) => (
  <TouchableHighlight
    underlayColor="none"
    activeOpacity={0.8}
    onPress={onPress}
    disabled={load}>
    <View style={styles.container}>
      <Icon />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text} </Text>
      </View>
    </View>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 5,
    padding: 5,
    backgroundColor: '#FFF',
    width: 250,
    height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
  textContainer: {
    flex: 1,
  },
});
