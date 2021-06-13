import React, {useEffect, useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {StyleSheet, Button, Text, View, TextInput} from 'react-native';
import {getUserInfo, updateUserInfo} from '../Services/userService';
import {useToast} from 'react-native-styled-toast';

const onRender = (field, defaultValue, text, placeholder) => {
  const {onChange, onBlur, value} = field;
  return (
    <View style={styles().input}>
      <Text style={styles().formText}>{text} </Text>
      <TextInput
        style={(styles().formText, styles().formInput)}
        onBlur={onBlur}
        onChangeText={val => onChange(val)}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
    </View>
  );
};

export const UserInfo = ({userId, orientation}) => {
  const [userInfo, setUserInfo] = useState({});
  const {toast} = useToast();
  const flex = orientation === 'LANDSCAPE' ? 1 : 0;
  useEffect(() => {
    const getCurrentUser = async () => {
      const data = await getUserInfo(userId, toast);
      if (data) {
        setUserInfo({id: userId, data});
      }
    };
    getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

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
    <View style={styles({flex}).container}>
      <Text style={styles().title}>User Info</Text>

      <Controller
        control={control}
        render={({field}) =>
          onRender(field, data.nickname, 'Nickname: ', ' Nickname')
        }
        name="nickname"
      />
      <Controller
        control={control}
        render={({field}) =>
          onRender(field, data.favFood, 'Favorite food: ', ' Favorite Food')
        }
        name="favFood"
      />
      <Controller
        control={control}
        render={({field}) =>
          onRender(
            field,
            data.favAnimal,
            'Favorite Animal: ',
            ' Favorite Animal',
          )
        }
        name="favAnimal"
      />
      <View style={styles().button}>
        <Button title="Save info" onPress={handleSubmit(onSave)} />
      </View>
    </View>
  );
};

const styles = ({flex} = {}) =>
  StyleSheet.create({
    button: {
      marginBottom: 10,
      alignSelf: 'center',
    },
    container: {
      backgroundColor: 'white',
      borderRadius: 10,
      margin: 20,
      padding: 10,
      flex,
    },
    formText: {
      width: 100,
    },
    formInput: {
      width: '60%',
      borderWidth: 1,
    },
    input: {
      flexDirection: 'row',
      marginBottom: 10,
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      marginBottom: 10,
      marginTop: 10,
    },
  });
