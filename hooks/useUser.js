import { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios';
import baseURL from '../constants/baseUrl';

const useUser = () => {
  const [user, setUser] = useState(null);

  const onLogin = useCallback(async ({ email, password }) => {
    try {
      const userData = await axios.post(`${baseURL}/login`, { email, password });

      if (!userData.data.token) {
        return { error: 'Пользователь не найден' };
      }

      await AsyncStorage.setItem('user', userData.data.token);

      setUser(userData.data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const onRegister = useCallback(async (data) => {
    try {
      await axios.post(`${baseURL}/register`, data);
      alert('Пользователь успешно создан');
    } catch (e) {
      console.log(e);
    }
  }, []);

  const onEdit = useCallback(async (data, userId) => {
    try {
      const userData = await axios.put(`${baseURL}/user/${userId}`, data);
      await AsyncStorage.setItem('user', userData.data.token);
      setUser(userData.data);
      alert('Сохранено!');
    } catch (e) {
      console.log(e);
    }
  }, []);

  const onLogout = useCallback(async () => {
    await AsyncStorage.removeItem('user');
  }, []);

  const onRemoveProfile = useCallback(async () => {
    try {
      await axios.delete(`${baseURL}/user/${user?.id_user}`);
      await AsyncStorage.removeItem('user');
    } catch (e) {
      console.log(e);
    }
  }, [user]);

  const onAddProfilePhoto = useCallback(
    async (data) => {
      try {
        const userData = await axios.post(`${baseURL}/user/${user?.id_user}/upload-photo`, data, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        });

        setUser(userData.data);
      } catch (e) {
        console.log(e);
      }
    },
    [user]
  );

  return {
    onLogin,
    user,
    onRegister,
    onEdit,
    onLogout,
    onRemoveProfile,
    onAddProfilePhoto,
  };
};
export default useUser;
