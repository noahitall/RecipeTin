import { createRealmContext } from "@realm/react";
import { Task } from "./Task";
import { Category } from "./Category";

export const TaskRealmContext = createRealmContext({
  schema: [Task, Category],
});

export const CategoryRealmContext = createRealmContext({
  schema: [Task, Category],
});
