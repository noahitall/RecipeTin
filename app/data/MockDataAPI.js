import { recipes, categories, ingredients, stepIngredients, steps } from './dataArrays';

//import realm context
import {  Recipe, Category, Ingredient, Step, StepIngredient } from "../models";

// Realm methods

// Get all categories from realm
export function getCategories(realm) {
  return realm.objects("Category");
  
}

export function getCategoryById(realm, categoryId) {  
  return realm.objects("Category").filtered("categoryId = $0", categoryId)[0];
}

export function getStepById(realm, stepId) {
  return realm.objects("Step").filtered("stepId = $0", stepId)[0]; 
}

export function getStepIngredientById(realm, stepIngredientId) {
  return realm.objects("StepIngredient").filtered("stepIngredientId = $0", stepIngredientId)[0];   
}
export function getIngredientById(realm, ingredientId) {    
  return realm.objects("Ingredient").filtered("ingredientId = $0", ingredientId)[0]
}

export function getIngredientName(realm, ingredientId) {    
  return getIngredientById(realm, ingredientId)?.name||"Missing";
}
export function getStepIngredientName(realm, stepIngredientID) {
  const stepIngredient =  getStepIngredientById(realm, stepIngredientID) //?.ingredient?.name||"Missing";  

  let parts = []
  
  if (stepIngredient.amount) parts = [...parts, stepIngredient.amount]  
  if (stepIngredient.units) parts = [...parts, stepIngredient.units]
  if (stepIngredient.ingredient) parts = [...parts, stepIngredient.ingredient.name]

  return parts.join(' ');
}

export function getIngredientUrl(realm, ingredientId) {
  return getIngredientById(realm, ingredientId)?.photoUrl||"";
}

export function getCategoryName(realm, categoryId) {
  return getCategoryById(realm, categoryId)?.name||"Missing";
}

export function getRecipes(realm, categoryId) {
  return realm.objects("Recipe").filtered("category.categoryId = $0", categoryId);
  
}
export function getAllRecipes(realm) {
  return realm.objects("Recipe");
}
export function getRecipe(realm, recipeId) {
  return realm.objects("Recipe").filtered('recipeId = $0', recipeId)[0];
}


//UNTESTED
export function getRecipesByIngredient(realm, ingredientId) {
  // Collect the recipes that have stepingredients that have the ingredientId
  const stepIngredients = realm.objects("StepIngredient").filtered("ingredient.ingredientId = $0", ingredientId);
  const recipes = stepIngredients.map(stepIngredient => stepIngredient.step.recipe);

  // Remove duplicates
  const uniqueRecipes = [...new Set(recipes)];
  return uniqueRecipes;

}

// Take an array of stepIngredientIds and return an array of arrays of [stepIngredient, ingredientName, ingredientPhotoUrl]
export function getAllStepIngredients(realm, stepIngredientArray) {
  return stepIngredientArray.map(stepIngredient => {    
    return [stepIngredient, stepIngredient.ingredient?.name, stepIngredient.ingredient?.photoUrl ];
  });

}

// functions for search
export function getRecipesByIngredientName(realm, ingredientName) {
  //Find ingredients that match name

  //Find recipes that have those ingredients in their stepIngredients

  const nameUpper = ingredientName.toUpperCase();
  const recipesArray = [];


  // ingredients.map(data => {
  //   if (data.name.toUpperCase().includes(nameUpper)) {
  //     // data.name.yoUpperCase() == nameUpper
  //     const recipes = getRecipesByIngredient(data.ingredientId);
  //     const unique = [...new Set(recipes)];
  //     unique.map(item => {
  //       recipesArray.push(item);
  //     });
  //   }
  // });
  const uniqueArray = [...new Set(recipesArray)];
  return uniqueArray;
}

export function getRecipesByCategoryName(realm, categoryName) {
  return realm.objects("Recipe").filtered("title CONTAINS[c] $0", categoryName);
}

export function getRecipesByRecipeName(realm, recipeName) {    
  return realm.objects("Recipe").filtered("title CONTAINS[c] $0", recipeName);     
  //return []
}


export function loadStaticData(realm, user) {
  //load static data from json files
  console.log("loading static data");
  // Import recipes, categories, ingredients, stepIngredients, steps into realm
  //load categories. Is it better to commit all at one or write inside the map? 
  //TODO benchmark realm load time with single write vs batch write
  // categories.map(category => {
  //   realm.write(() => {
  //     new Category(realm, category.name, category.photo_url, category.id, user?.id);
  //   });    
  // });
  // vs
  realm.write(() => {

    // Load objects in order of references
    // Categories first
    categories.forEach((category) => {      
      new Category(realm, category.name, category.photo_url, category.id, user?.id);
    });

    // Ingredients
    ingredients.forEach((ingredient) => {
      new Ingredient(realm, ingredient.name, ingredient.photo_url, ingredient.ingredientId, user?.id);
    });
    
  } );

  realm.write(() => {
    // StepIngredients
    stepIngredients.forEach((stepIngredient) => {
      const ingredient = realm.objects("Ingredient").filtered("ingredientId = $0", stepIngredient.ingredientId)[0];
      new StepIngredient(realm, stepIngredient.stepIngredientId, ingredient, stepIngredient.amount, stepIngredient.units, user?.id);
    });
  } );
  
  realm.write(() => {
    // Step
    steps.forEach((step) => {
      // Map the list of stepIngredients stepIngredientIds to the actual stepIngredient objects
      const stepIngredients = getAllStepIngredients(realm, step.stepIngredients).map((stepIngredientArray)=>stepIngredientArray[0]);
      //const stepIngredients = []
      new Step(realm, step.stepId, stepIngredients, step.lengthInMinutes, step.description, step.warning, user?.id);
    });
  } );

  realm.write(() => {

    // Next Recipes (move this down as more objects are added)
    recipes.forEach((recipe) => {
      const category = realm.objects("Category").filtered("categoryId = $0", recipe.categoryId)[0];      
      //Convert the recipe.steps stepIds to a list of step objects
      const recipeSteps = recipe.steps.map((stepId) => getStepById(realm, stepId));
      //Convert the recipe.stepIngredients stepIngredientIds to a list of stepIngredient objects
      const recipeStepIngredients = recipe.stepIngredients.map((stepIngredientId) => getStepIngredientById(realm, stepIngredientId));
      
      new Recipe(realm, user?.id, user?.id, 
        recipe.recipeId, recipe.title, recipe.photo_url, recipe.photosArray, recipe.time, 
        recipe.total_length_in_minutes, recipe.active_length_in_minutes, recipe.materials, 
        recipeStepIngredients, recipeSteps, recipe.description, recipe.servingsMade, category
      );
    });
    
    return null;
  }

  );

  //Print report of how many objects were loaded of each class
  console.log("Loaded " + realm.objects("Category").length + " categories");
  console.log("Loaded " + realm.objects("Ingredient").length + " ingredients");
  console.log("Loaded " + realm.objects("StepIngredient").length + " stepIngredients");
  console.log("Loaded " + realm.objects("Step").length + " steps");
  console.log("Loaded " + realm.objects("Recipe").length + " recipes");

}