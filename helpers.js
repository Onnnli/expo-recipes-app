import PinoyFoods from './assets/FoodsDB/foodsDB';

const qq = PinoyFoods.map((food) => {
  const prepareFood = {};
  const nutr = {};
  food.recipe.nutrition?.forEach((el) => {
    nutr[el.name.toLowerCase()] = el.amount;
  });

  const ingr = food.recipe.ingredients.map((ing) => {
    delete ing.tagalog;
    delete ing.name;
    delete ing.type;

    return ing;
  });

  prepareFood.categories = food.type;
  prepareFood.nutrition = nutr;
  prepareFood.ingredients = ingr;
  prepareFood.name = food.name;
  prepareFood.userId = 3;
  prepareFood.time = food.recipe.details.time.cook;
  prepareFood.servings = food.recipe.details.servings;
  prepareFood.description = food.recipe.instructions.join(' ');
  prepareFood.image = food.image.replace('.', 'public').replace('food/', '');

  return prepareFood;
});
