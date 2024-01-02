import { useCallback, useState } from 'react';
import axios from 'react-native-axios';

import baseURL from '../constants/baseUrl';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);

  const getAllCategories = useCallback(async () => {
    const categoriesData = await axios.get(`${baseURL}/categories`);
    setCategories(categoriesData.data);

    return categoriesData.data;
  }, []);

  return {
    getAllCategories,
    categories,
  };
};
