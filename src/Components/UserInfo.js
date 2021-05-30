import React, {useEffect, useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {StyleSheet, Button, Text, View, TextInput} from 'react-native';
import {getUserInfo, updateUserInfo} from '../Services/userService';
import {useToast} from 'react-native-styled-toast';

export const UserInfo = ({userId}) => {
  const [userInfo, setUserInfo] = useState({});
  const {toast} = useToast();

  const getCurrentUser = async () => {
    const data = await getUserInfo(userId, toast);
    if (data) {
      setUserInfo({id: userId, data});
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const {id, data = {}} = userInfo;
  const {control, handleSubmit} = useForm();

  const onSave = async formData => {
    const newData = {
      nickname: formData.nickname ?? data.nickname ?? '',
      favFood: formData.favFood ?? data.favFood ?? '',
      favAnimal: formData.favAnimal ?? data.favAnimal ?? '',
    };
    await updateUserInfo(id, newData, toast);
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
                defaultValue={data.favAnimal || ''}
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
