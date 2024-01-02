import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

import FoodCard from '../components/FoodCard';
import globalStyles from '../assets/styles/globalStyles';
import { useRecipes } from '../hooks/useRecipes';

export default function FoodCategory({ navigation, route }) {
  const { name, id } = route.params;

  const { getRecipesByCategory } = useRecipes();

  const [recipes, setRecipes] = useState([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: name.toUpperCase(),
    });
  }, [navigation, name]);

  useEffect(() => {
    (async function () {
      const recipesByCategory = await getRecipesByCategory(id);
      setRecipes(recipesByCategory);
    })();
  }, [getRecipesByCategory, id]);

  return (
    <View style={globalStyles.screen}>
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={recipes}
          ListHeaderComponent={() => <View style={{ height: 12 }} />}
          ListFooterComponent={() => <View style={{ height: 12 }} />}
          renderItem={({ item }) => (
            <FoodCard navigation={navigation} route={route} recipe={item} />
          )}
        />
      </View>
    </View>
  );
}
