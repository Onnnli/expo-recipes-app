import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';

import globalStyles from '../assets/styles/globalStyles';
import FoodCardSearch from '../components/FoodCardSearch';
import window from '../assets/controller/window';
import { useRecipes } from '../hooks/useRecipes';
import AppContext from '../assets/globals/appContext';

function MyRecipesScreen({ navigation, route }) {
  const { user } = useContext(AppContext);
  const { getMyRecipe } = useRecipes();

  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    (async function () {
      const allRecipes = await getMyRecipe(user.id_user);

      setRecipe(allRecipes);
    })();
  }, []);

  useEffect(() => {}, [recipe]);

  useLayoutEffect(() => {
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
          onPress={() => navigation.push(`CreateRecipe`)}
        >
          <View
            style={{
              padding: 1,
              backgroundColor: '#FEA11F',
              borderRadius: 100,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff' }}>Создать</Text>
            <Text style={{ color: '#fff' }}>рецепт</Text>
          </View>

          <Icon type="material-icons" name="add-circle" color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={globalStyles.screen}>
      {recipe.length > 0 ? (
        <FlatList
          persistentScrollbar
          data={recipe}
          ListHeaderComponent={() => <View style={{ height: 12 }} />}
          ListFooterComponent={() => <View style={{ height: 12 }} />}
          renderItem={({ item }) => (
            <FoodCardSearch recipe={item} navigation={navigation} route={route} profile />
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyLabelContainer}>
            <Text style={styles.emptyLabel}>У Вас пока нет рецептов!🥲Хотите создать?</Text>
            <TouchableOpacity
              style={{
                marginTop: 20,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: '#FAAF3E',
                padding: 10,
              }}
              onPress={() => navigation.push('CreateRecipe')}
            >
              <Text style={{ color: '#FAAF3E', fontWeight: '700', fontSize: 20 }}>
                Создать рецепт
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchFieldContainer: {
    width: window.width - 100,
    paddingVertical: 4,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4080f018',
  },
  searchField: {
    textAlignVertical: 'center',
    paddingRight: 8,
    fontSize: 16,
    flex: 1,
    color: '#444',
  },
  emptyContainer: {
    padding: 32,
    height: window.height / 3 + 16,
    maxHeight: 480,
    width: 400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyLabelContainer: {
    marginVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyLabel: {
    fontSize: window.width / 20 > 32 ? 32 : window.width / 20,
    fontWeight: 'bold',
    color: '#888',
  },
  emptyLabelDetails: {
    textAlign: 'center',
    marginVertical: 8,
    color: '#aaa',
    fontSize: window.width / 32 > 24 ? 24 : window.width / 32,
    width: window.width / 1.5,
    maxWidth: 480,
  },
});

export default MyRecipesScreen;
