import { createRealmContext } from "@realm/react";
import { Task } from "./Task";
import { Category } from "./Category";
import { Recipe } from "./Recipe";
import { Ingredient } from "./Ingredient";
import { StepIngredient } from "./StepIngredient";
import { Step } from "./Step";

export const TaskRealmContext = createRealmContext({
  schema: [Task, Category, Recipe, Ingredient, StepIngredient, Step],
  schemaVersion: 6,
});

export const CategoryRealmContext = createRealmContext({
  schema: [Task, Category, Recipe, Ingredient, StepIngredient, Step],
  schemaVersion: 5,
});

// Export Models for consumption
export { Task, Category, Recipe, Ingredient, StepIngredient, Step };