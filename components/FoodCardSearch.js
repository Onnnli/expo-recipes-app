import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import FavoriteButton from './FavoriteButton';
import baseUrl from '../constants/baseUrl';
import { useRecipes } from '../hooks/useRecipes';
import DeleteRecipeModal from './DeleteRecipeModal';

export default function FoodCardSearch({ navigation, recipe, profile }) {
  const { getCategoriesByRecipe } = useRecipes();

  const [categories, setCategories] = useState([]);
  const [deleteRecipeModal, setDeleteRecipeModal] = useState(false);

  useEffect(() => {
    (async function () {
      const categoriesData = await getCategoriesByRecipe(recipe.id_recipe);

      setCategories(categoriesData);
    })();
  }, [getCategoriesByRecipe, recipe]);

  return (
    <View style={styles.cardWrapper}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.cardContainer}
        onPress={() => {
          navigation.push('FoodView', { recipe, categories });
        }}
      >
        <View style={styles.cardImageContainer}>
          <Image style={styles.cardImage} source={{ uri: `${baseUrl}/${recipe.image}` }} />
        </View>

        <View style={[styles.cardFoodColor]} />

        <View style={styles.cardDetailsContainer}>
          <Text style={{ color: '#333', fontWeight: 'bold', fontSize: 16 }}>{recipe.name}</Text>
          <View style={styles.foodTypeContainer}>
            {categories.length > 0 && (
              <View style={styles.foodType}>
                <Text style={styles.foodTypeLabel}>{categories[0].Categorie.name}</Text>
              </View>
            )}
            {categories.length > 1 ? (
              <Text style={styles.foodTypesLabel}>+{categories.length - 1}</Text>
            ) : null}
          </View>
        </View>

        {profile ? (
          <View>
            <TouchableOpacity
              style={[styles.favButtonContainer, { width: 50 }]}
              onPress={() => navigation.push('MyRecipesEdit', { recipe, categories })}
            >
              <Icon type="material-icons" name="edit" color="#ccc" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.favButtonContainer, { width: 50 }]}
              onPress={() => setDeleteRecipeModal(true)}
            >
              <Icon type="material-icons" name="delete" color="#F3B2B2FF" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.favButtonContainer}>
            <FavoriteButton id={recipe.id_recipe} />
          </View>
        )}
      </TouchableOpacity>

      <DeleteRecipeModal
        recipe={recipe}
        isOpen={deleteRecipeModal}
        onRequestClose={() => setDeleteRecipeModal(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  cardContainer: {
    height: 96,
    backgroundColor: 'white',
    flexDirection: 'row',
    elevation: 2,
    overflow: 'hidden',
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
  },
  cardImageContainer: {
    height: 96,
    aspectRatio: 5 / 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  cardImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  cardFoodColor: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    borderRightWidth: 3,
  },
  cardDetailsContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    height: '100%',
    flex: 1,
  },
  foodTypeContainer: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
  foodType: {
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 2,
    borderRadius: 6,
    borderColor: '#888',
  },
  foodTypeLabel: {
    fontSize: 10,
    color: '#888',
    fontWeight: 'bold',
  },
  foodTypesLabel: {
    fontSize: 8,
    color: '#888',
    fontWeight: 'bold',
    aspectRatio: 1,
    padding: 4,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: '#888',
    marginLeft: 6,
  },
  favButtonContainer: {
    padding: 8,
  },
});
