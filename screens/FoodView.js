import React, { useLayoutEffect } from 'react';
import { StyleSheet, Image, Text, View, ScrollView } from 'react-native';

import globalStyles from '../assets/styles/globalStyles';
import window from '../assets/controller/window';
import FoodViewType from '../components/FoodViewType';
import FoodRecipe from '../components/FoodRecipe';
import FavoriteButton from '../components/FavoriteButton';
import baseUrl from '../constants/baseUrl';

export default function FoodView({ navigation, route }) {
  const { recipe, categories } = route.params;

  // Lol
  const viewRecipe = recipe.Recipe || recipe;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: viewRecipe.name,
    });
  }, [navigation, recipe]);

  return (
    <ScrollView style={globalStyles.screen}>
      <View>
        <Image source={{ uri: `${baseUrl}/${viewRecipe.image}` }} style={styles.image} />
        <View style={styles.favoriteButtonContainer}>
          <FavoriteButton id={viewRecipe.id_recipe} />
        </View>
      </View>

      <View style={styles.articleContainer}>
        <View style={styles.article}>
          <View style={styles.foodHeaderContainer}>
            <View style={styles.foodNameContainer}>
              <Text style={styles.foodName}>{viewRecipe.name}</Text>
            </View>
          </View>
          <Text style={styles.foodAuthor}>
            Recipe By: {viewRecipe.User.name} {viewRecipe.User.last_name}
          </Text>

          <ScrollView
            horizontal
            style={styles.foodTypesContainer}
            showsHorizontalScrollIndicator={false}
          >
            {categories.map((category) => (
              <FoodViewType
                key={category.Categorie.id_category}
                navigation={navigation}
                route={route}
                foodType={category}
              />
            ))}
          </ScrollView>

          <FoodRecipe recipe={viewRecipe} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: window.width / 1.5,
    width: window.width,
    maxHeight: window.height / 2,
    resizeMode: 'cover',
  },
  favoriteButtonContainer: {
    position: 'absolute',
    backgroundColor: '#fff',
    padding: 6,
    elevation: 16,
    right: 12,
    bottom: 44,
    borderRadius: 100,
    aspectRatio: 1,
  },
  articleContainer: {
    marginTop: -64,
    paddingTop: 32,
    flex: 1,
  },
  article: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: '#fff',
    elevation: 32,
    flex: 1,
    paddingBottom: window.height / 4,
  },
  foodHeaderContainer: {
    flexDirection: 'row',
  },
  foodNameContainer: {
    flex: 1,
    paddingHorizontal: 4,
    marginBottom: 8,
    marginTop: 8,
  },
  foodName: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#222',
  },
  foodTagalog: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: -4,
    color: '#444',
  },
  foodDescriptionContainer: {
    marginVertical: 12,
  },
  foodDescription: {
    textAlign: 'justify',
    fontSize: 16,
    paddingHorizontal: 16,
  },
  divider: {
    backgroundColor: '#0002',
    height: 1,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  foodInformationWrapper: {
    marginTop: 12,
  },
  foodSocials: {
    marginHorizontal: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 8,
  },
  foodSocialLogo: {
    marginHorizontal: 12,
  },
  foodAuthor: {
    marginHorizontal: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 12,
    fontStyle: 'italic',
    color: '#444',
    fontWeight: 'bold',
  },
  foodTypesContainer: {
    marginVertical: 0,
  },
});
