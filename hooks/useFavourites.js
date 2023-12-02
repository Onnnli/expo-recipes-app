import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import { favoriteFoods } from '../assets/controller/query';

const useFavourites = () => {
  const [favs, setFavs] = useState([]);
  const [foods, setFoods] = useState([]);

  const getData = useCallback(async () => {
    try {
      const value = JSON.parse(await AsyncStorage.getItem('favorites'));
      return value || [];
    } catch (e) {
      return null;
    }
  }, []);

  const saveData = useCallback(async (foodIds) => {
    try {
      const value = JSON.stringify(foodIds);
      await AsyncStorage.setItem('favorites', value);
    } catch (e) {
      alert(e);
    }
  }, []);

  useEffect(() => {
    (async function () {
      const data = await getData();
      setFavs(data || []);
      await fetchFoods(data || []);
    })();
  }, []);

  const fetchFoods = useCallback(async (favFoods) => {
    const data = await favoriteFoods(favFoods);
    setFoods(data);
  }, []);

  const addFavorites = useCallback(
    async (id) => {
      const tempFavs = favs;
      if (!tempFavs.find((food) => food === id)) {
        tempFavs.push(id);
      }
      setFavs(tempFavs);
      const data = await favoriteFoods(tempFavs);
      setFoods(data);
      await saveData(tempFavs);
    },
    [favs, saveData]
  );

  const clearFavorites = useCallback(async () => {
    const tempFavs = [];
    setFavs(tempFavs);
    const data = await favoriteFoods(tempFavs);
    setFoods(data);
    await saveData(tempFavs);
  }, [saveData]);

  const deleteFavorites = useCallback(
    async (id) => {
      const tempFavs = favs;
      const index = tempFavs.indexOf(id);
      if (index > -1) {
        tempFavs.splice(index, 1);
      }
      setFavs(tempFavs);

      const data = await favoriteFoods(tempFavs);
      setFoods(data);
      await saveData(tempFavs);
    },
    [favs, saveData]
  );

  return {
    favs,
    foods,
    addFavorites,
    clearFavorites,
    deleteFavorites,
  };
};

export default useFavourites;
