import React from 'react';
import {StyleSheet, View, TouchableHighlight, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const CustomButton = ({text, load, onPress, icon}) => (
  <TouchableHighlight
    underlayColor="none"
    activeOpacity={0.8}
    onPress={onPress}
    disabled={load}>
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon style={styles.button} name={icon} size={25} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text} </Text>
      </View>
    </View>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  button: {
    marginRight: 10,
    marginLeft: 10,
  },
  container: {
    flexDirection: 'row',
    margin: 5,
    padding: 5,
    backgroundColor: '#FFF',
    borderRadius: 15,
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
  iconContainer: {
    width: 50,
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
