import { createRealmContext } from "@realm/react";
import { Task } from "./Task";
import { Category } from "./Category";
import { Recipe } from "./Recipe";

export const TaskRealmContext = createRealmContext({
  schema: [Task, Category, Recipe],
  schemaVersion: 4,
});

export const CategoryRealmContext = createRealmContext({
  schema: [Task, Category, Recipe],
  schemaVersion: 4,
});
