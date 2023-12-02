import React from 'react';
import { Icon } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DiscoverStack from './DiscoverStack';
import CategoriesStack from './CategoriesStack';
import SearchStack from './SearchStack';
import FavoritesStack from './FavoritesStack';
import ProfileStack from './ProfileStack';

const Tab = createBottomTabNavigator();

function TabNavigationRoutes() {
  return (
    <Tab.Navigator
      initialRouteName="DiscoverStack"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#36C464',
        tabBarActiveBackgroundColor: '#0801',
        tabBarStyle: {
          height: 90,
        },
        tabBarItemStyle: {
          paddingVertical: 12,
        },
      }}
    >
      <Tab.Screen
        name="DiscoverStack"
        component={DiscoverStack}
        options={{
          title: 'Discover',
          tabBarIcon: (props) => (
            <Icon type="ionicon" name="fast-food-outline" color={props.color} />
          ),
        }}
      />
      <Tab.Screen
        name="CategoriesStack"
        component={CategoriesStack}
        options={{
          title: 'Categories',
          tabBarIcon: (props) => (
            <Icon type="material-icons" name="restaurant" color={props.color} />
          ),
        }}
      />
      <Tab.Screen
        name="SearchStack"
        component={SearchStack}
        options={{
          title: 'Search',
          tabBarIcon: (props) => <Icon type="material-icons" name="search" color={props.color} />,
        }}
      />
      <Tab.Screen
        name="FavoritesStack"
        component={FavoritesStack}
        options={{
          title: 'Favorites',
          tabBarIcon: (props) => (
            <Icon type="material-icons" name="favorite-outline" color={props.color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          title: 'Профиль',
          tabBarIcon: (props) => <Icon type="material-icons" name="person" color={props.color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigationRoutes;
