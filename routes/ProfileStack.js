import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../screens/Profile';
import ProfileEditScreen from '../screens/ProfileEditScreen';

const Stack = createNativeStackNavigator();

function ProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: true,
        headerTitleStyle: {
          fontWeight: 'bold',
          textTransform: 'uppercase',
          color: '#444',
        },
        headerShadowVisible: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen
        name="Profile"
        options={({ navigation, route }) => ({
          title: 'Профиль',
        })}
      >
        {(props) => <Profile {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="ProfileEdit"
        options={({ navigation, route }) => ({
          title: 'Редактирование профиля',
        })}
      >
        {(props) => <ProfileEditScreen {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default ProfileStack;
