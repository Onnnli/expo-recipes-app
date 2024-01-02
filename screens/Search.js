import React, { useCallback, useEffect, useState } from 'react';
import { Text, TextInput, StyleSheet, FlatList, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import window from '../assets/controller/window';
import globalStyles from '../assets/styles/globalStyles';
import { useRecipes } from '../hooks/useRecipes';
import FoodCardSearch from '../components/FoodCardSearch';
import SearchModal from '../components/SearchModal';

export default function Search({ navigation, route }) {
  const { getAllRecipes, getAllIngredients } = useRecipes();
  const [recipes, setRecipes] = useState([]);
  const [searchRecipe, setSearchRecipe] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    (async function () {
      const allRecipes = await getAllRecipes();
      const allIngredients = await getAllIngredients();
      setRecipes(allRecipes);
      setIngredients(allIngredients);
      setSearchRecipe(allRecipes);
    })();
  }, []);

  const onChange = useCallback(
    (value) => {
      setSearchText(value);

      if (value.trim()) {
        const filteredRecipe = recipes.filter((recipe) =>
          recipe.name.toLowerCase().includes(value.toLowerCase())
        );

        setSearchRecipe(filteredRecipe);
      } else {
        setSearchRecipe(recipes);
      }
    },
    [recipes]
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <>
          <View style={styles.searchFieldContainer}>
            <Icon
              type="material-icons"
              name="search"
              color="#666"
              style={{ marginHorizontal: 12 }}
            />
            <TextInput
              style={styles.searchField}
              keyboardType="email-address"
              placeholder="Поиск по названию..."
              onChangeText={onChange}
              value={searchText}
            />
          </View>
          <TouchableOpacity
            style={{
              marginLeft: 10,
              padding: 3,
              backgroundColor: '#FEA11F',
              borderRadius: 100,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            activeOpacity={0.6}
            onPress={() => setOpenModal(true)}
          >
            <Icon
              type="material-icons"
              name="filter-list"
              color="#fff"
              style={{ marginHorizontal: 12 }}
            />
          </TouchableOpacity>
        </>
      ),
    });
  }, [navigation, onChange, searchText]);

  return (
    <View style={globalStyles.screen}>
      {searchRecipe.length > 0 ? (
        <FlatList
          persistentScrollbar
          data={searchRecipe}
          ListHeaderComponent={() => <View style={{ height: 12 }} />}
          ListFooterComponent={() => <View style={{ height: 12 }} />}
          renderItem={({ item }) => (
            <FoodCardSearch recipe={item} navigation={navigation} route={route} />
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Icon
            type="material-icons"
            name="search"
            size={window.width / 3 > 240 ? 240 : window.width / 3}
            color="#bbb"
          />
          <View style={styles.emptyLabelContainer}>
            <Text style={styles.emptyLabel}>Поиск не дал результатов!</Text>
          </View>
        </View>
      )}

      <SearchModal
        setSearchRecipe={setSearchRecipe}
        ingredients={ingredients}
        visible={openModal}
        onClose={() => setOpenModal(false)}
      />
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
    width: '100%',
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
