export async function favoriteFoods(favorites = [], allRecipes = []) {
  const foods = [];

  for (let i = 0; i < favorites.length; i++) {
    const result = allRecipes.filter((food) => {
      return (food.Recipe || food)?.id_recipe === favorites[i];
    });
    foods.push(result[0]);
  }

  return foods;
}
