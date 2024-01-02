import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Favorites from '../screens/Favorites';
import FoodView from '../screens/FoodView';
import FoodCategory from '../screens/FoodCategory';
import ShopList from '../screens/ShopList';

const Stack = createNativeStackNavigator();

function FavoritesStack() {
  return (
    <Stack.Navigator
      initialRouteName="Favorites"
      screenOptions={{
        headerShown: true,
        headerTitleStyle: {
          fontWeight: 'bold',
          textTransform: 'uppercase',
          color: '#444',
        },
      }}
    >
      <Stack.Screen
        name="Favorites"
        options={({ navigation, route }) => ({
          title: 'Любимые рецепты',
        })}
      >
        {(props) => <Favorites {...props} />}
      </Stack.Screen>

      <Stack.Screen
        name="ShopList"
        options={({ navigation, route }) => ({
          title: 'Список покупок',
        })}
      >
        {(props) => <ShopList {...props} />}
      </Stack.Screen>

      <Stack.Screen
        name="FoodView"
        options={({ navigation, route }) => ({
          title: 'Рецепты',
          animation: 'slide_from_bottom',
        })}
      >
        {(props) => <FoodView {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="FoodCategory"
        options={({ navigation, route }) => ({
          title: 'Рецепты по категориям',
          animation: 'slide_from_right',
        })}
      >
        {(props) => <FoodCategory {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default FavoritesStack;
