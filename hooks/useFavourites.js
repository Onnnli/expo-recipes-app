import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { favoriteFoods } from '../assets/controller/query';
import { useRecipes } from './useRecipes';

const useFavourites = () => {
  const [favs, setFavs] = useState([]);
  const [foods, setFoods] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);

  const { getAllRecipes } = useRecipes();

  const getData = async () => {
    try {
      const value = JSON.parse(await AsyncStorage.getItem('favorites'));
      return value || [];
    } catch (e) {
      return null;
    }
  };

  const saveData = async (foodIds) => {
    try {
      const value = JSON.stringify(foodIds);
      await AsyncStorage.setItem('favorites', value);
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    (async function () {
      const recipesData = await getAllRecipes();
      setAllRecipes(recipesData);
      const data = await getData();
      setFavs(data || []);
      const dataFav = await favoriteFoods(data, recipesData);
      setFoods(dataFav || []);
    })();
  }, []);

  const addFavorites = async (id) => {
    const tempFavs = favs;

    if (!tempFavs.find((food) => food === id)) {
      tempFavs.push(id);
    }
    setFavs(tempFavs);

    const data = await favoriteFoods(tempFavs, allRecipes);

    setFoods(data);

    await saveData(tempFavs);
  };

  const clearFavorites = async () => {
    const tempFavs = [];
    setFavs(tempFavs);
    const data = await favoriteFoods(tempFavs, allRecipes);
    setFoods(data);
    await saveData(tempFavs);
  };

  const deleteFavorites = async (id) => {
    const tempFavs = favs;
    const index = tempFavs.indexOf(id);
    if (index > -1) {
      tempFavs.splice(index, 1);
    }
    setFavs(tempFavs);

    const data = await favoriteFoods(tempFavs, allRecipes);
    setFoods(data);
    await saveData(tempFavs);
  };

  return {
    favs,
    foods,
    addFavorites,
    clearFavorites,
    deleteFavorites,
  };
};

export default useFavourites;
