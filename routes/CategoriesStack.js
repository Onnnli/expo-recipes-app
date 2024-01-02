import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Categories from '../screens/Categories';
import FoodCategory from '../screens/FoodCategory';
import FoodView from '../screens/FoodView';
import AddRecipeScreen from '../screens/AddRecipeScreen';

const Stack = createNativeStackNavigator();

function CategoriesStack() {
  return (
    <Stack.Navigator
      initialRouteName="Categories"
      screenOptions={{
        headerShown: true,
        headerTitleStyle: {
          fontWeight: 'bold',
          textTransform: 'uppercase',
          color: '#444',
        },
        headerStyle: {
          justifyContent: 'center',
        },
      }}
    >
      <Stack.Screen
        name="Categories"
        options={() => ({
          title: 'Категории',
        })}
      >
        {(props) => <Categories {...props} />}
      </Stack.Screen>

      <Stack.Screen
        name="AddRecipe"
        options={() => ({
          title: 'Создать рецепт',
        })}
      >
        {(props) => <AddRecipeScreen {...props} />}
      </Stack.Screen>

      <Stack.Screen
        name="FoodCategory"
        options={() => ({
          title: 'Food Category',
          animation: 'slide_from_right',
        })}
      >
        {(props) => <FoodCategory {...props} />}
      </Stack.Screen>

      <Stack.Screen
        name="FoodView"
        options={() => ({
          title: 'Food View',
          animation: 'slide_from_bottom',
        })}
      >
        {(props) => <FoodView {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default CategoriesStack;
