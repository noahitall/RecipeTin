import { createRealmContext } from "@realm/react";
import { Task } from "./Task";
import { Category } from "./Category";
import { Recipe } from "./Recipe";
import { Ingredient } from "./Ingredient";

export const TaskRealmContext = createRealmContext({
  schema: [Task, Category, Recipe, Ingredient],
  schemaVersion: 6,
});

export const CategoryRealmContext = createRealmContext({
  schema: [Task, Category, Recipe, Ingredient],
  schemaVersion: 5,
});

// Export Models for consumption
export { Task, Category, Recipe, Ingredient };