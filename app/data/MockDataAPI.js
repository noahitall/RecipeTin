import { Text } from 'react-native';
import React, { Component } from 'react';
import { recipes, categories, ingredients, stepIngredients, steps } from './dataArrays';

//import realm context
import {  Recipe, Category, Ingredient, Step, StepIngredient } from "../models";

// Realm methods

// Get all categories from realm
export function getCategories(realm) {
  return realm.objects("Category");
}


export function getCategoryById(realm, categoryId) {
  let category;
  getCategories().map(data => {
    if (data.categoryId == categoryId) {
      category = data;
    }
  });
  return category;
}

export function getStepById(realm, stepId) {
  let step;
  steps.map(data => {
    if (data.stepId == stepId) {
      step = data;
      //if there are stepIngredients for this step, look them up by id and assign them to step.stepIngredients
      if (data.stepIngredients) {
        step.stepIngredients = data.stepIngredients.map(stepIngredientId => {
          return getStepIngredientById(realm, stepIngredientId); 
        });
      }
    }});
  return step;
}

export function getStepIngredientById(realm, stepIngredientId) {
  let stepIngredient;
  stepIngredients.map(data => {
    if (data.stepIngredientId == stepIngredientId) {
      stepIngredient = data;
    }
  });
  return stepIngredient;
}
export function getIngredientById(realm, ingredientId) {  
  //get recipes from realm where categoryId matches
  return realm.objects("Ingredient").filtered("ingredientId = $0", ingredientId)[0]
}

export function getIngredientName(realm, ingredientId) {
    
  return getIngredientById(realm, ingredientId)?.name||"Missing";
}
export function getStepIngredientName(realm, stepIngredientID) {
  let name;
  //Get Step ingredient from realm by stepIngredientId

  stepIngredients.map(data => {
    if (data.stepIngredientId == stepIngredientID) {      
      let parts = []
      //assign parts amount to the array if it is not empty
      if (data.amount) parts = [...parts, data.amount]
      //assign parts units to the array if it is not empty
      if (data.units) parts = [...parts, data.units]
      //assign parts ingredientId to the array if it is not empty
      if (data.ingredientId) parts = [...parts, getIngredientName(realm, data.ingredientId)]

      //  data.amount, data.ingredientId]
      name = parts.join(' ');
    }
  });
  return name;
}

export function getIngredientUrl(realm, ingredientID) {
  let url;
  ingredients.map(data => {
    if (data.ingredientId == ingredientID) {
      url = data.photo_url;
    }
  });
  return url;
}

export function getCategoryName(realm, categoryId) {
  let name;
  categories.map(data => {
    if (data.id == categoryId) {
      name = data.name;
    }
  });
  return name;
}

export function getRecipes(realm, categoryId) {
  //get recipes from realm
  console.log("looking for recipes with caegoryId: " + categoryId);
  //get recipes from realm where categoryId matches
  return realm.objects("Recipe").filtered("categoryId = $0", categoryId);
  
}
export function getAllRecipes(realm) {
  return realm.objects("Recipe");
}
export function getRecipe(realm, recipeId) {
  //get recipes from realm where recipeId matches
  console.log("looking for recipe with recipeId: " + recipeId);
  return realm.objects(Recipe).filtered('recipeId = $0', recipeId)[0];
}
// modifica
export function getRecipesByIngredient(realm, ingredientId) {
  const recipesArray = [];
  recipes.map(data => {
    data.ingredients.map(index => {
      if (index[0] == ingredientId) {
        recipesArray.push(data);
      }
    });
  });
  return recipesArray;
}

export function getNumberOfRecipes(realm, categoryId) {
  let count = 0;
  recipes.map(data => {
    if (data.categoryId == categoryId) {
      count++;
    }
  });
  return count;
}

export function getAllIngredients(realm, idArray) {
  const ingredientsArray = [];
  idArray.map(index => {
    ingredients.map(data => {
      if (data.ingredientId == index[0]) {
        ingredientsArray.push([data, index[1]]);
      }
    });
  });
  return ingredientsArray;
}

//TODO this should join the ingredients within stepIngredients - once realm is integrated for ingredients & stepIngredients
// Do recipes and stepingredients first. 
// Then do recipe steps. 
export function getAllStepIngredients(realm, idArray) {
  const stepIngredientsArray = [];
  idArray.map(index => {
    stepIngredients.map(data => {
      if (data.stepIngredientId == index) {
        //console.log("ingredientId: " + data.ingredientId);
        const ingredientName = getIngredientName(realm, data.ingredientId);
        const ingredientPhotoUrl = getIngredientUrl(realm, data.ingredientId);
        stepIngredientsArray.push([data, ingredientName, ingredientPhotoUrl]);
      }
    });
  });
  return stepIngredientsArray;
}

// functions for search
export function getRecipesByIngredientName(ingredientName) {
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
  const nameUpper = categoryName.toUpperCase();
  const recipesArray = [];
  // categories.map(data => {
  //   if (data.name.toUpperCase().includes(nameUpper)) {
  //     const recipes = []; //getRecipes(realm, data.id); // return a vector of recipes
  //     recipes.map(item => {
  //       recipesArray.push(item);
  //     });
  //   }
  // });
  return recipesArray;
}

export function getRecipesByRecipeName(recipeName) {
  const nameUpper = recipeName.toUpperCase();
  const recipesArray = [];
  // recipes.map(data => {
  //   if (data.title.toUpperCase().includes(nameUpper)) {
  //     recipesArray.push(data);
  //   }
  // });
  return recipesArray;
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
      new Step(realm, step.stepId, stepIngredients, step.lengthInMinutes, step.description, step.warning, user?.id);
    });
  } );

  realm.write(() => {

    // Next Recipes (move this down as more objects are added)
    recipes.forEach((recipe) => {
      const category = realm.objects("Category").filtered("categoryId = $0", recipe.categoryId)[0];
      console.log("found category: " + category.name);
      new Recipe(realm, user?.id, user?.id, 
        recipe.recipeId, recipe.categoryId, recipe.title, recipe.photo_url, 
        recipe.photosArray, recipe.time, recipe.total_length_in_minutes, recipe.active_length_in_minutes, recipe.materials, 
        recipe.stepIngredients, recipe.steps, recipe.description, recipe.servingsMade, category
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