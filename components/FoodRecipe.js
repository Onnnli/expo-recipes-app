import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, FlatList, Animated, Text, View } from 'react-native';
import { ExpandingDot } from 'react-native-animated-pagination-dots';
import window from '../assets/controller/window';
import tableStyles from '../assets/styles/tableStyles';
import FoodIngredient from './FoodIngredient';
import { useRecipes } from '../hooks/useRecipes';

export default function FoodRecipe({ recipe }) {
  const { getNutritionByRecipe, getIngredients } = useRecipes();

  const [nutrition, setNutrition] = useState({});
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    (async function () {
      const nutritionData = await getNutritionByRecipe(recipe.id_recipe);
      const ingredientsData = await getIngredients(recipe.id_recipe);

      setNutrition(nutritionData);
      setIngredients(ingredientsData);
    })();
  }, [getIngredients, getNutritionByRecipe, recipe]);

  const scrollX = React.useRef(new Animated.Value(0)).current;

  const instructions = useMemo(() => recipe.description.split('. '), [recipe]);

  return (
    <View style={styles.recipeContainer}>
      <View style={styles.ingredientsContainer}>
        <Text style={styles.ingredientsLabel}>Ингредиенты</Text>
        <View>
          {ingredients.map((ingredient, index) => (
            <FoodIngredient
              sortId={index + 1}
              key={ingredient.id_ingredient_recipe}
              ingredient={ingredient}
            />
          ))}
        </View>
      </View>

      <View style={styles.divider} />
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsLabel}>Шаги прилотовления</Text>
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          horizontal
          data={instructions}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false,
          })}
          decelerationRate="normal"
          scrollEventThrottle={16}
          renderItem={({ item, index }) => (
            <View style={styles.instructionWrapper}>
              <View style={styles.instructionContainer}>
                <Text style={styles.instructionNumberContainer}>Шаг {index + 1}</Text>
                <View style={styles.instruction}>
                  <Text style={styles.instructionText}>{item}</Text>
                </View>
              </View>
            </View>
          )}
        />
        <ExpandingDot
          data={instructions}
          scrollX={scrollX}
          inActiveDotOpacity={0.2}
          activeDotColor="#36C464"
          dotStyle={{
            flex: 1,
            maxHeight: 10,
            maxWidth: 10,
            borderRadius: 100,
            marginHorizontal: 5,
          }}
          slidingIndicatorStyle={{
            zIndex: 99,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
          }}
          containerStyle={{
            bottom: 0,
            padding: 8,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      </View>
      <View style={styles.divider} />

      <View>
        <View style={styles.nutritionContainer}>
          <View style={[styles.nutritionWrapper, tableStyles.container, tableStyles.border]}>
            <Text style={tableStyles.title}>КБЖУ и витамины</Text>
            <View style={tableStyles.twoColumns}>
              <Text style={tableStyles.leftColumn}>Калории</Text>
              <Text style={tableStyles.rightColumn}>{nutrition.calories}</Text>
            </View>
            <View style={tableStyles.twoColumns}>
              <Text style={tableStyles.leftColumn}>Белки</Text>
              <Text style={tableStyles.rightColumn}>{nutrition.protein}</Text>
            </View>
            <View style={tableStyles.twoColumns}>
              <Text style={tableStyles.leftColumn}>Жиры</Text>
              <Text style={tableStyles.rightColumn}>{nutrition.fat}</Text>
            </View>
            <View style={tableStyles.twoColumns}>
              <Text style={tableStyles.leftColumn}>Углеводы</Text>
              <Text style={tableStyles.rightColumn}>{nutrition.carbohydrates}</Text>
            </View>
            <View style={tableStyles.twoColumns}>
              <Text style={tableStyles.leftColumn}>Холестерин</Text>
              <Text style={tableStyles.rightColumn}>{nutrition.cholesterol}</Text>
            </View>
            <View style={tableStyles.twoColumns}>
              <Text style={tableStyles.leftColumn}>клетчатка</Text>
              <Text style={tableStyles.rightColumn}>{nutrition.fiber}</Text>
            </View>
            <View style={tableStyles.twoColumns}>
              <Text style={tableStyles.leftColumn}>Железо</Text>
              <Text style={tableStyles.rightColumn}>{nutrition.iron}</Text>
            </View>
            <View style={tableStyles.twoColumns}>
              <Text style={tableStyles.leftColumn}>калий</Text>
              <Text style={tableStyles.rightColumn}>{nutrition.potassium}</Text>
            </View>
            <View style={tableStyles.twoColumns}>
              <Text style={tableStyles.leftColumn}>насыщенные жиры</Text>
              <Text style={tableStyles.rightColumn}>{nutrition.saturatedFat}</Text>
            </View>
            <View style={tableStyles.twoColumns}>
              <Text style={tableStyles.leftColumn}>натрий</Text>
              <Text style={tableStyles.rightColumn}>{nutrition.sodium}</Text>
            </View>
            <View style={tableStyles.twoColumns}>
              <Text style={tableStyles.leftColumn}>кальций</Text>
              <Text style={tableStyles.rightColumn}>{nutrition.calcium}</Text>
            </View>
            <View style={tableStyles.twoColumns}>
              <Text style={tableStyles.leftColumn}>Сахар</Text>
              <Text style={tableStyles.rightColumn}>{nutrition.sugar}</Text>
            </View>
            <View style={tableStyles.twoColumns}>
              <Text style={tableStyles.leftColumn}>Витамин А</Text>
              <Text style={tableStyles.rightColumn}>{nutrition.vitaminA}</Text>
            </View>
            <View style={tableStyles.twoColumns}>
              <Text style={tableStyles.leftColumn}>Витамин С</Text>
              <Text style={tableStyles.rightColumn}>{nutrition.vitaminC}</Text>
            </View>
            <View style={tableStyles.twoColumns}>
              <Text style={tableStyles.leftColumn}>питательных веществ</Text>
              <Text style={tableStyles.rightColumn}>{nutrition.serving}</Text>
            </View>
          </View>
        </View>
        <View style={styles.divider} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  recipeContainer: {
    marginVertical: 4,
  },
  recipeBranchContainer: {
    marginVertical: 8,
  },
  divider: {
    backgroundColor: '#0002',
    height: 1,
    marginVertical: 16,
    marginHorizontal: 16,
  },
  ingredientsContainer: {
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  ingredientsLabel: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24,
    paddingVertical: 4,
    textTransform: 'uppercase',
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#36C464',
    color: '#fff',
    elevation: 2,
    maxWidth: 480,
    width: '100%',
  },
  instructionsContainer: {
    alignItems: 'center',
  },
  instructionsLabel: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24,
    paddingVertical: 4,
    textTransform: 'uppercase',
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#36C464',
    color: '#fff',
    elevation: 2,
    marginHorizontal: 12,
    maxWidth: 480,
    width: window.width - 32,
  },
  instructionWrapper: {
    width: window.width - 24,
    marginHorizontal: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    paddingBottom: 32,
    alignItems: 'center',
  },
  instructionContainer: {
    width: window.width - 32,
    alignItems: 'center',
    elevation: 2,
    backgroundColor: 'white',
    overflow: 'hidden',
    borderRadius: 8,
    flex: 1,
  },
  instructionNumberContainer: {
    backgroundColor: '#36C464',
    fontSize: 20,
    width: '100%',
    textTransform: 'uppercase',
    padding: 4,
    fontWeight: 'bold',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    elevation: 2,
  },
  instruction: {
    backgroundColor: '#FFC02D',
    minHeight: 200,
    paddingHorizontal: 24,
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructionText: {
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingTop: 16,
    paddingBottom: 24,
    maxWidth: 480,
  },
  nutritionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  nutritionWrapper: {
    width: window.width - 32,
  },
});
