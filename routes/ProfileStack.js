import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../screens/Profile';
import ProfileEditScreen from '../screens/ProfileEditScreen';
import MyRecipesScreen from '../screens/MyRecipesScreen';
import AddRecipeScreen from '../screens/AddRecipeScreen';
import FoodView from '../screens/FoodView';
import EditRecipeScreen from '../screens/EditRecipeScreen';

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

      <Stack.Screen
        name="MyRecipes"
        options={({ navigation, route }) => ({
          title: 'Мои рецепты',
        })}
      >
        {(props) => <MyRecipesScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="FoodView"
        options={({ navigation, route }) => ({
          title: 'Мои рецепты',
        })}
      >
        {(props) => <FoodView {...props} />}
      </Stack.Screen>

      <Stack.Screen
        name="CreateRecipe"
        options={({ navigation, route }) => ({
          title: 'Мои рецепты',
        })}
      >
        {(props) => <AddRecipeScreen {...props} />}
      </Stack.Screen>

      <Stack.Screen
        name="MyRecipesEdit"
        options={({ navigation, route }) => ({
          title: 'Редактирование рецепта',
        })}
      >
        {(props) => <EditRecipeScreen {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default ProfileStack;
