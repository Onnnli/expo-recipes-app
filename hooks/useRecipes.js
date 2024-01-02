import { useCallback } from 'react';
import axios from 'react-native-axios';

import baseURL from '../constants/baseUrl';

export const useRecipes = () => {
  const getRecipesByCategory = useCallback(async (categoryId) => {
    const recipes = await axios.get(`${baseURL}/category/${categoryId}/recipes`);

    return recipes.data;
  }, []);

  const getCategoriesByRecipe = useCallback(async (recipeId) => {
    const recipes = await axios.get(`${baseURL}/recipes/${recipeId}/categories`);

    return recipes.data;
  }, []);

  const getNutritionByRecipe = useCallback(async (recipeId) => {
    const recipes = await axios.get(`${baseURL}/nutrition/${recipeId}`);

    return recipes.data;
  }, []);

  const getIngredients = useCallback(async (recipeId) => {
    const recipes = await axios.get(`${baseURL}/ingredients/recipes/${recipeId}`);

    return recipes.data;
  }, []);

  const getAuthorById = useCallback(async (userId) => {
    const recipes = await axios.get(`${baseURL}/recipes/user/${userId}`);

    return recipes.data;
  }, []);

  const getAllRecipes = useCallback(async () => {
    const recipes = await axios.get(`${baseURL}/recipes`);

    return recipes.data;
  }, []);

  const getAllIngredients = useCallback(async () => {
    const recipes = await axios.get(`${baseURL}/ingredients`);

    return recipes.data;
  }, []);

  const searchByFilter = useCallback(async (searchIngredients, searchTitle) => {
    const recipes = await axios.post(`${baseURL}/recipes/filter`, {
      searchIngredients,
      searchTitle,
    });

    return recipes.data;
  }, []);

  const publishRecipe = useCallback(async (formData) => {
    const recipes = await axios.post(`${baseURL}/recipes`, formData);

    return recipes.data;
  }, []);

  const publishImageRecipe = useCallback(async (recipeId, data) => {
    const recipes = await axios.post(`${baseURL}/recipes/${recipeId}/upload-image`, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });

    return recipes.data;
  }, []);

  const getMyRecipe = useCallback(async (userId) => {
    const recipes = await axios.get(`${baseURL}/recipes/by-user/${userId}`);

    return recipes.data;
  }, []);

  const editMyRecipe = useCallback(async (data, recipeId) => {
    const recipes = await axios.put(`${baseURL}/recipes/${recipeId}/edit`, data);

    return recipes.data;
  }, []);

  const deleteMyRecipe = useCallback(async (recipeId) => {
    await axios.delete(`${baseURL}/recipes/${recipeId}/delete`);
  }, []);

  const getFavoriteIngredients = useCallback(async (data) => {
    const favsIngr = await axios.post(`${baseURL}/ingredients/shop-list`, data);

    return favsIngr.data;
  }, []);

  return {
    getFavoriteIngredients,
    deleteMyRecipe,
    editMyRecipe,
    getMyRecipe,
    publishImageRecipe,
    publishRecipe,
    getRecipesByCategory,
    getCategoriesByRecipe,
    getNutritionByRecipe,
    getIngredients,
    getAuthorById,
    getAllRecipes,
    getAllIngredients,
    searchByFilter,
  };
};
