import React, { useCallback, useContext, useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import AppContext from '../assets/globals/appContext';

function LoginScreen({ navigation }) {
  const context = useContext(AppContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(null);

  const onPress = useCallback(async () => {
    try {
      const data = await context.onLogin({ email, password });

      if (!data?.error) {
        setError(false);
        navigation.navigate('Home');

        return;
      }

      setError(true);
    } catch (e) {
      setError(e);
    }
  }, [context, email, navigation, password]);

  useEffect(() => {
    (async function () {
      // await AsyncStorage.removeItem('user');
      const token = await AsyncStorage.getItem('user');

      if (token) {
        const [emailStorage, passwordStorage] = token.split('_');

        await context.onLogin({ email: emailStorage, password: passwordStorage });

        navigation.navigate('Home');
      }
    })();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ paddingHorizontal: 25 }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}
        >
          Авторизоваться
        </Text>

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
          label="Password"
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

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}
        >
          <Text style={{ color: '#ff2020' }}>{error && 'Неверный email или пароль'}</Text>
        </View>

        <CustomButton label="Войти" onPress={onPress} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 30,
        }}
      >
        <TouchableOpacity>
          <Text
            onPress={() => navigation.navigate('Register')}
            style={{ color: '#FAAF3E', fontWeight: '700' }}
          >
            Зарегестрироваться
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;
