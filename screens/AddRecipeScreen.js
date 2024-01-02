import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ScrollView, TextInput, View, Text, TouchableOpacity } from 'react-native';

import { Chip, Icon } from 'react-native-elements';
import globalStyles from '../assets/styles/globalStyles';
import RecipePhotoUploader from '../components/RecipePhotoUploader';
import { useRecipes } from '../hooks/useRecipes';
import { useCategories } from '../hooks/useCategories';
import IngredientFieldRow from '../components/IngredientFieldRow';
import NutritionField from '../components/NutritionField';
import AppContext from '../assets/globals/appContext';

const nutritionLabel = {
  serving: 'питательных веществ',
  calories: 'Калории',
  protein: 'Белки',
  fat: 'Жиры',
  carbohydrates: 'Углеводы',
  cholesterol: 'Холестерин',
  fiber: 'клетчатка',
  iron: 'Железо',
  potassium: 'калий',
  saturatedFat: 'насыщенные жиры',
  sodium: 'натрий',
  calcium: 'кальций',
  sugar: 'Сахар',
  vitaminA: 'Витамин А',
  vitaminC: 'Витамин С',
};

function AddRecipeScreen({ navigation }) {
  const { getAllIngredients, publishRecipe, publishImageRecipe } = useRecipes();
  const { user } = useContext(AppContext);
  const { getAllCategories } = useCategories();
  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState('');
  const [min, setMin] = useState('');
  const [hour, setHour] = useState('');
  const [description, setDescription] = useState('');
  const [servings, setServings] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [photo, setPhoto] = React.useState(null);
  const [photoResult, setPhotoResult] = React.useState(null);
  const [field, setField] = useState([
    {
      ingredient: null,
      amount: '',
    },
  ]);
  const [nutrition, setNutrition] = useState({
    calories: null,
    protein: null,
    fat: null,
    carbohydrates: null,
    cholesterol: null,
    fiber: null,
    iron: null,
    potassium: null,
    saturatedFat: null,
    sodium: null,
    calcium: null,
    sugar: null,
    vitaminA: null,
    vitaminC: null,
    serving: null,
  });

  useEffect(() => {
    (async function () {
      const allIngredients = await getAllIngredients();
      const allCategories = await getAllCategories();

      setCategories(allCategories);
      setIngredients(allIngredients);
    })();
  }, []);

  const normalizeIngredients = useMemo(
    () =>
      ingredients.reduce((acc, el) => {
        acc.push({
          value: el.id_ingredient,
          label: el.name,
        });

        return acc;
      }, []),
    [ingredients]
  );

  const normalizeCategories = useMemo(
    () =>
      categories.reduce((acc, el) => {
        acc.push({
          key: el.id_category,
          value: el.name,
        });

        return acc;
      }, []),
    [categories]
  );

  const onPressCategory = useCallback(
    (key) => {
      if (selectedCategories.includes(key)) {
        setSelectedCategories((prevState) => prevState.filter((pr) => pr !== key));
      } else {
        setSelectedCategories((prevState) => [...prevState, key]);
      }
    },
    [selectedCategories]
  );

  const createIngredient = useCallback(() => {
    setField((prevState) => {
      return [
        ...prevState,
        {
          ingredient: null,
          amount: '',
        },
      ];
    });
  }, []);

  const onRemoveIngredient = useCallback((index) => {
    return setField((prevState) => {
      return prevState.filter((el, i) => i !== index);
    });
  }, []);

  const onSelectIngredient = useCallback((index, ingr) => {
    setField((prevState) => {
      const newState = prevState;
      const f = prevState.find((el, i) => index === i);

      if (f) {
        f.ingredient = ingr;
      }

      newState[index] = f;

      return newState;
    });
  }, []);

  const onChangeAmount = useCallback((index, amount) => {
    setField((prevState) => {
      const newState = prevState;
      const f = prevState.find((el, i) => index === i);

      if (f) {
        f.amount = amount;
      }

      newState[index] = f;

      return newState;
    });
  }, []);

  const createFormData = (photoData) => {
    const data = new FormData();

    data.append('image', {
      name: `${new Date()}_image_profile`,
      uri: photoData.assets[0].uri,
      type: photoData.assets[0].type,
    });

    return data;
  };

  const onSubmit = useCallback(async () => {
    const formData = {
      ingredients: field,
      name,
      description,
      min,
      hour,
      servings,
      categories: selectedCategories,
      nutrition,
      userId: user.id_user,
    };
    const result = await publishRecipe(formData);

    await publishImageRecipe(result.id_recipe, createFormData(photoResult));

    alert('Рецепт успешно опубликован!');

    navigation.navigate('Categories');
  }, [
    field,
    name,
    description,
    min,
    hour,
    servings,
    selectedCategories,
    nutrition,
    user.id_user,
    publishRecipe,
    publishImageRecipe,
    photoResult,
    navigation,
  ]);

  return (
    <ScrollView style={[globalStyles.screen, { padding: 30 }]}>
      <View style={{ marginBottom: 10 }}>
        <Text style={{ lineHeight: 17, fontSize: 15, color: '#818181' }}>Выбор категории</Text>
        <ScrollView horizontal style={{ flexDirection: 'row', marginHorizontal: -30 }}>
          {normalizeCategories?.map((category) => (
            <Chip
              titleStyle={{ color: '#000' }}
              buttonStyle={{
                borderRadius: 20,
                borderWidth: 1,
                borderColor: '#FEA11F',
              }}
              style={[
                { borderRadius: 20, marginHorizontal: 5 },
                selectedCategories.includes(category.key) && { backgroundColor: '#FEA11F' },
              ]}
              key={category.key}
              title={category.value.toUpperCase()}
              onPress={() => onPressCategory(category.key)}
              type="outline"
              containerStyle={{ marginVertical: 15, borderColor: 'red' }}
            />
          ))}
        </ScrollView>
      </View>

      <View style={{ marginBottom: 25 }}>
        <Text style={{ lineHeight: 17, fontSize: 15, marginBottom: 10, color: '#818181' }}>
          Название рецепта *
        </Text>
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: '#FEA11F',
            borderBottomWidth: 1,
            paddingBottom: 8,
          }}
        >
          <TextInput
            placeholder="Введите название рецепта"
            style={{ flex: 1, paddingVertical: 0, fontSize: 18 }}
            value={name}
            onChangeText={setName}
          />
        </View>
      </View>

      <View style={{ marginBottom: 25 }}>
        <Text style={{ lineHeight: 17, fontSize: 15, marginBottom: 10, color: '#818181' }}>
          Время приготовления *
        </Text>

        <View style={{ flexDirection: 'row' }}>
          <TextInput
            placeholder="0"
            keyboardType="numeric"
            style={{
              flex: 1,
              paddingVertical: 0,
              fontSize: 17,
              paddingHorizontal: 10,
              borderColor: '#ccc',
              borderWidth: 1,
            }}
            value={hour}
            onChangeText={setHour}
          />
          <TextInput
            editable={false}
            type="numberInput"
            style={{ flex: 1, paddingVertical: 0, paddingHorizontal: 5, fontSize: 17 }}
            value="час(ов)"
          />
          <TextInput
            placeholder="0"
            keyboardType="numeric"
            style={{
              flex: 1,
              paddingVertical: 8,
              fontSize: 17,
              paddingHorizontal: 10,
              borderColor: '#ccc',
              borderWidth: 1,
            }}
            value={min}
            onChangeText={setMin}
          />
          <TextInput
            editable={false}
            style={{ flex: 1, paddingVertical: 0, paddingHorizontal: 5, fontSize: 17 }}
            value="минут"
          />
        </View>
      </View>

      <View style={{ marginBottom: 25 }}>
        <Text style={{ lineHeight: 17, fontSize: 15, marginBottom: 10, color: '#818181' }}>
          Ингредиеты *
        </Text>

        {field.map((fields, index) => (
          <IngredientFieldRow
            onRemove={() => onRemoveIngredient(index)}
            key={index}
            index={index}
            onSelectIngredient={onSelectIngredient}
            normalizeIngredients={normalizeIngredients}
            onChangeAmount={onChangeAmount}
          />
        ))}

        <TouchableOpacity
          style={{
            padding: 5,
            marginTop: 10,
            backgroundColor: '#FEA11F',
            flex: 1,
            borderRadius: 20,
          }}
          onPress={createIngredient}
        >
          <Icon name="add-circle-outline" color="#fff" />
        </TouchableOpacity>
      </View>

      <View>
        <Text style={{ lineHeight: 17, fontSize: 15, marginBottom: 10, color: '#818181' }}>
          Описание рецепта *
        </Text>

        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
            borderRightWidth: 1,
            borderRightColor: '#ccc',
            paddingBottom: 8,
            marginBottom: 25,
          }}
        >
          <TextInput
            style={{ flex: 1, paddingVertical: 0, fontSize: 17 }}
            placeholder="Описание рецепта"
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
          />
        </View>
      </View>

      <View style={{ maxHeight: 500, marginBottom: 25 }}>
        <Text style={{ lineHeight: 17, fontSize: 15, marginBottom: 10, color: '#818181' }}>
          Фото *
        </Text>

        <RecipePhotoUploader photo={photo} setPhoto={setPhoto} setPhotoResult={setPhotoResult} />
      </View>

      <View style={{ marginBottom: 25 }}>
        <Text style={{ lineHeight: 17, fontSize: 15, marginBottom: 10, color: '#818181' }}>
          Порция
        </Text>
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}
        >
          <TextInput
            style={{ flex: 1, paddingVertical: 0, fontSize: 17 }}
            value={servings}
            onChangeText={setServings}
            placeholder="Порция"
          />
        </View>
      </View>

      <View style={{ marginBottom: 25 }}>
        <Text style={{ lineHeight: 17, fontSize: 15, color: '#818181' }}>КБЖУ и витамины</Text>

        <View>
          {Object.keys(nutrition).map((nutr) => (
            <NutritionField
              onChangeText={(value) => {
                setNutrition((prevState) => {
                  const newState = prevState;
                  newState[nutr] = value;
                  return newState;
                });
              }}
              value={nutrition[nutr]}
              key={nutr}
              label={nutritionLabel[nutr]}
            />
          ))}
        </View>
      </View>

      <View style={{ paddingBottom: 300 }}>
        <TouchableOpacity
          onPress={onSubmit}
          style={{
            padding: 10,
            marginTop: 10,
            backgroundColor: '#FEA11F',
            flex: 1,
            borderRadius: 20,
          }}
        >
          <Text style={{ textAlign: 'center', color: '#fff', fontSize: 17 }}>Опубликовать</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default AddRecipeScreen;
