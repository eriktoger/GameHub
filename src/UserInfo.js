import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {StyleSheet, Button, Text, View, TextInput} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export const UserInfo = ({userInfo}) => {
  const {id, data = {}} = userInfo;
  const {control, handleSubmit} = useForm();

  const onSave = async formData => {
    const newData = {
      nickname: formData.nickname ?? data.nickname,
      favFood: formData.favFood ?? data.favFood,
      favAnimal: formData.favAnimal ?? data.favAnimal,
    };
    await firestore().collection('users').doc(id).set(newData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Info</Text>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => {
          return (
            <View style={styles.input}>
              <Text style={styles.formText}>Nickname: </Text>
              <TextInput
                style={(styles.formText, styles.formInput)}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                defaultValue={data.nickname}
                placeholder=" nickname"
              />
            </View>
          );
        }}
        name="nickname"
      />
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => {
          return (
            <View style={styles.input}>
              <Text style={styles.formText}>Favorite food: </Text>
              <TextInput
                style={(styles.formText, styles.formInput)}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                defaultValue={data.favFood}
                placeholder=" Favorite Food"
              />
            </View>
          );
        }}
        name="favFood"
      />

      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => {
          return (
            <View style={styles.input}>
              <Text style={styles.formText}>Favorie animal: </Text>
              <TextInput
                style={(styles.formText, styles.formInput)}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                defaultValue={data.favAnimal}
                placeholder=" Favorite Animal"
              />
            </View>
          );
        }}
        name="favAnimal"
      />
      <View style={styles.button}>
        <Button title="Save info" onPress={handleSubmit(onSave)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
    width: 100,
    alignSelf: 'center',
  },
  container: {
    marginHorizontal: 20,
  },
  formText: {
    width: 100,
  },
  formInput: {
    width: 200,
    borderWidth: 1,
  },
  input: {
    flexDirection: 'row',
    //alignSelf: 'baseline',
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    //alignSelf: 'baseline',
  },
});
