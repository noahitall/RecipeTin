import { Text } from 'react-native';
import React, { Component } from 'react';
import { recipes, categories, ingredients, stepIngredients, steps } from './dataArrays';

//import realm context
import { TaskRealmContext } from "../models";
const { useRealm, useQuery } = TaskRealmContext;
import { Recipe } from "../models/Recipe";
import { Category } from "../models/Category";
import { useUser } from "@realm/react";

// Realm methods

// Get all categories from realm
export function getCategories() {
  const realm = useRealm();
  const user = useUser();
  const categories = realm.objects("Category")
  return categories;
}


export function getCategoryById(categoryId) {
  let category;
  getCategories().map(data => {
    if (data.categoryId == categoryId) {
      category = data;
    }
  });
  return category;
}

export function getStepById(stepId) {
  let step;
  steps.map(data => {
    if (data.stepId == stepId) {
      step = data;
      //if there are stepIngredients for this step, look them up by id and assign them to step.stepIngredients
      if (data.stepIngredients) {
        step.stepIngredients = data.stepIngredients.map(stepIngredientId => {
          return getStepIngredientById(stepIngredientId); 
        });
      }
    }});
  return step;
}

export function getStepIngredientById(stepIngredientId) {
  let stepIngredient;
  stepIngredients.map(data => {
    if (data.stepIngredientId == stepIngredientId) {
      stepIngredient = data;
    }
  });
  return stepIngredient;
}
export function getIngredientById(ingredientId) {
  let ingredient;
  ingredients.map(data => {
    if (data.ingredientId == ingredientId) {
      ingredient = data;
    }
  });
  return ingredient;
}

export function getIngredientName(ingredientID) {
  let name;
  ingredients.map(data => {
    if (data.ingredientId == ingredientID) {
      name = data.name;
    }
  });
  return name;
}
export function getStepIngredientName(stepIngredientID) {
  let name;
  stepIngredients.map(data => {
    if (data.stepIngredientId == stepIngredientID) {      
      let parts = []
      //assign parts amount to the array if it is not empty
      if (data.amount) parts = [...parts, data.amount]
      //assign parts units to the array if it is not empty
      if (data.units) parts = [...parts, data.units]
      //assign parts ingredientId to the array if it is not empty
      if (data.ingredientId) parts = [...parts, getIngredientName(data.ingredientId)]

      //  data.amount, data.ingredientId]
      name = parts.join(' ');
    }
  });
  return name;
}

export function getIngredientUrl(ingredientID) {
  let url;
  ingredients.map(data => {
    if (data.ingredientId == ingredientID) {
      url = data.photo_url;
    }
  });
  return url;
}

export function getCategoryName(categoryId) {
  let name;
  categories.map(data => {
    if (data.id == categoryId) {
      name = data.name;
    }
  });
  return name;
}

export function getRecipes(categoryId) {
  //get recipes from realm
  console.log("looking for recipes with caegoryId: " + categoryId);
  const realm = useRealm();
  const user = useUser();
  //get recipes from realm where categoryId matches
  return realm.objects("Recipe").filtered("categoryId = $0", categoryId);
  
}
export function getAllRecipes() {
  //get recipes from realm
  const realm = useRealm();
  const user = useUser();
  //get recipes from realm where categoryId matches
  const recipesResult = useQuery(Recipe, () => {
    return realm.objects("Recipe");
  });
  //TODO Fix filtering. broken so manually filtering for now
  return recipesResult;
}
export function getRecipe(recipeId) {
  const realm = useRealm();
  const user = useUser();
  //get recipes from realm where recipeId matches
  const recipesResult = useQuery(Recipe, () => {
    return realm.objects(Recipe).filtered('recipeId = $0', recipeId);
  });
  
  return recipesResult[0];
}
// modifica
export function getRecipesByIngredient(ingredientId) {
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

export function getNumberOfRecipes(categoryId) {
  let count = 0;
  recipes.map(data => {
    if (data.categoryId == categoryId) {
      count++;
    }
  });
  return count;
}

export function getAllIngredients(idArray) {
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
export function getAllStepIngredients(idArray) {
  const stepIngredientsArray = [];
  idArray.map(index => {
    stepIngredients.map(data => {
      if (data.stepIngredientId == index) {
        console.log("ingredientId: " + data.ingredientId);
        const ingredientName = getIngredientName(data.ingredientId);
        const ingredientPhotoUrl = getIngredientUrl(data.ingredientId);
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
  ingredients.map(data => {
    if (data.name.toUpperCase().includes(nameUpper)) {
      // data.name.yoUpperCase() == nameUpper
      const recipes = getRecipesByIngredient(data.ingredientId);
      const unique = [...new Set(recipes)];
      unique.map(item => {
        recipesArray.push(item);
      });
    }
  });
  const uniqueArray = [...new Set(recipesArray)];
  return uniqueArray;
}

export function getRecipesByCategoryName(categoryName) {
  const nameUpper = categoryName.toUpperCase();
  const recipesArray = [];
  categories.map(data => {
    if (data.name.toUpperCase().includes(nameUpper)) {
      const recipes = getRecipes(data.id); // return a vector of recipes
      recipes.map(item => {
        recipesArray.push(item);
      });
    }
  });
  return recipesArray;
}

export function getRecipesByRecipeName(recipeName) {
  const nameUpper = recipeName.toUpperCase();
  const recipesArray = [];
  recipes.map(data => {
    if (data.title.toUpperCase().includes(nameUpper)) {
      recipesArray.push(data);
    }
  });
  return recipesArray;
}


export function loadStaticData() {
  //load static data from json files
  console.log("loading static data");
  // Import recipes, categories, ingredients, stepIngredients, steps into realm
  const realm = useRealm();
  const user = useUser();
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

    // TODO Is there a limit to how much data can be written in a single realm write?
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

}