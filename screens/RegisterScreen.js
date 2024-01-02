import React, { useCallback, useContext, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InputField from '../components/InputField';

import CustomButton from '../components/CustomButton';
import AppContext from '../assets/globals/appContext';

function RegisterScreen({ navigation }) {
  const context = useContext(AppContext);

  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(null);

  const onPress = useCallback(async () => {
    try {
      await context.onRegister({ name, lastName, email, password });
      navigation.navigate('Login');
    } catch (e) {
      setError(e);
    }
  }, [context, email, navigation, password]);

  const onChangeConfirmPassword = useCallback(
    (value) => {
      if (value !== password) {
        setError('Пароли не совпадают');
      } else {
        setError(null);
      }
    },
    [password]
  );

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 25 }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}
        >
          Регистрация
        </Text>

        <InputField
          onChangeText={setName}
          label="Имя"
          icon={
            <Ionicons name="person-outline" size={20} color="#666" style={{ marginRight: 5 }} />
          }
        />

        <InputField
          onChangeText={setLastName}
          label="Фамилия"
          icon={
            <Ionicons name="person-outline" size={20} color="#666" style={{ marginRight: 5 }} />
          }
        />

        <InputField
          onChangeText={setEmail}
          label="Email"
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          keyboardType="email-address"
        />

        <InputField
          onChangeText={setPassword}
          label="Пароль"
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
        />

        <InputField
          onChangeText={onChangeConfirmPassword}
          label="Подтвердите пароль"
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
        />

        <CustomButton disabled={!!error} label="Зарегестироваться" onPress={onPress} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}
        >
          <Text>Уже есть аккаунт?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: '#FAAF3E', fontWeight: '700' }}>Войти</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default RegisterScreen;
