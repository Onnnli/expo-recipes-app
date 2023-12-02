import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import FoodCard from '../components/FoodCard';
import { categoryFoods } from '../assets/controller/query';
import globalStyles from '../assets/styles/globalStyles';

function compareStrings(a, b) {
  a = a.toLowerCase();
  b = b.toLowerCase();

  return a < b ? -1 : a > b ? 1 : 0;
}

export default function FoodCategory({ navigation, route }) {
  const [category] = useState(route.params);
  const [foods, setFoods] = useState([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: category,
    });
  }, [navigation, category]);

  useEffect(() => {
    categoryFoods(category)
      .then((data) => {
        setFoods(data);
      })
      .catch((error) => {
        alert(error);
      });
  }, [category]);

  foods.sort((a, b) => compareStrings(a.name, b.name));

  return (
    <View style={globalStyles.screen}>
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={foods}
          ListHeaderComponent={() => <View style={{ height: 12 }} />}
          ListFooterComponent={() => <View style={{ height: 12 }} />}
          renderItem={({ item }) => <FoodCard navigation={navigation} route={route} food={item} />}
        />
      </View>
    </View>
  );
}
