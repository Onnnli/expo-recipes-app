import React, { useContext, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import FoodCategoryCard from '../components/FoodCategoryCard';
import globalStyles from '../assets/styles/globalStyles';
import AppContext from '../assets/globals/appContext';

export default function Categories({ navigation }) {
  const context = useContext(AppContext);

  useEffect(() => {
    (async function () {
      await context.getAllCategories();
    })();
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            padding: 6,
            backgroundColor: '#FEA11F',
            borderRadius: 100,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          activeOpacity={0.6}
          onPress={() => navigation.push(`AddRecipe`)}
        >
          <View
            style={{
              padding: 1,
              backgroundColor: '#FEA11F',
              borderRadius: 100,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff' }}>Добавить</Text>
            <Text style={{ color: '#fff' }}>рецепт</Text>
          </View>

          <Icon type="material-icons" name="add-circle" color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView style={globalStyles.screen}>
      <View style={styles.categoryContainer}>
        {context.categories.map((category) => (
          <FoodCategoryCard
            key={category.id_category}
            navigation={navigation}
            category={category}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    paddingBottom: 4,
  },
});
